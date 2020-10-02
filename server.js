const express = require('express')
const morgan = require('morgan')

const server = express();

const logger = morgan("combined");

server.use(express.json());
server.use(logger);

server.get('/', (req,res) => {
    res.status(200).json({check: "Success"})
});

module.exports = server;