const express = require('express');

const postDb = require('./postDb')
const { validatePostId } = require('./postMiddleware.js')
const { validatePost } = require('../users/userMiddleware.js')

const router = express.Router();

router.get('/', (req, res) => {
  postDb
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ message: 'Server was unable to retrieve Posts', error: err }))
});

router.get('/:id', validatePostId, (req, res) => {
  const { id } = req.params

  postDb
    .getById(id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ message: 'Server was unable to retrieve Post', error: err }))
});

router.delete('/:id', validatePostId, (req, res) => {
  const { id } = req.params

  postDb
    .remove(id)
    .then(post => res.status(200).json(`${post} was deleted`))
    .catch(err => res.status(500).json({ message: 'Server was unable to delete Post', error: err }))
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  const { id } = req.params
  const changes = req.body

  postDb
    .update(id, changes)
    .then(() => res.status(200).json(`${req.post.text} was updated to ${changes.text}`))
    .catch(err => res.status(500).json({ message: 'Server was unable to update Post', err}))
  
});

module.exports = router;
