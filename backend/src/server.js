const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.PORT || 3333;
const server = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.use(cors());
server.use(express.json());
server.use(routes);
server.listen(PORT);
