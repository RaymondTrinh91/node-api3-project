const express = require('express');
const helmet = require('helmet')

const server = express();

const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')

server.use(helmet())
server.use(express.json())
server.use(logger)

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl}`)
  next()
}

module.exports = server;
