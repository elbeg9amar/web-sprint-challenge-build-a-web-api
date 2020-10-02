const express = require('express')
const morgan = require('morgan')
const actionRouter = require('./Routers/actionRouter')
const projectRouter = require('./Routers/projectRouter')
const server = express();

const logger = morgan("combined");

server.use(express.json());
server.use(logger);
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter)

server.get('/', (req,res) => {
    res.status(200).json({check: "Success"})
});

module.exports = server;