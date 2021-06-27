require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const routes = require('./routes');
const PORT = process.env.PORT || 3333;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

if (process.env.NODE_ENV !== 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ server }),
    ],
    tracesSampleRate: 1.0,
  });
}

const connectedUsers = {};
io.on('connection', socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(function onConnection(req, res, next) {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(routes);

app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

server.listen(PORT);
