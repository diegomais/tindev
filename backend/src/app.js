const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

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
app.use(routes);

module.exports = app;
