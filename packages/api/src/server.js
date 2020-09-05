const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const routes = require('./routes');
const PORT = process.env.PORT || 3333;
const server = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ server }),
  ],
  tracesSampleRate: 1.0,
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.use(cors());
server.use(express.json());

server.use(Sentry.Handlers.requestHandler());
server.use(Sentry.Handlers.tracingHandler());

server.use(routes);

server.use(Sentry.Handlers.errorHandler());
server.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});
server.listen(PORT);
