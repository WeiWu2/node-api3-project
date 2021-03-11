const express = require('express');
const middleware = require('../middleware/middleware')
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const router = express.Router();



router.get('/', (req, res, next) => {
  Users.get()
  .then((users) => {
    res.json(users)
  })
  .catch(next)
});

router.get('/:id', middleware.validateUserId ,(req, res) => {
    res.json(req.user)
});

router.post('/', middleware.validateUser,(req, res, next) => {
    Users.insert(req.body)
    .then((user) => {
      res.status(202).json(user)
    })
    .catch(next)
});

router.put('/:id',middleware.validateUserId, middleware.validateUser, (req, res,next) => {
  Users.update(req.user).then((user) => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.delete('/:id',middleware.validateUserId, (req, res,next) => {
    Users.delete(req.user)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
});

router.get('/:id/posts',middleware.validateUserId, (req, res,next) => {
  Posts.getById(req.params.id)
  .then((posts) => {
      res.json(posts)
  })
  .catch(next)
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',middleware.validateUserId, middleware.validateUser, (req, res) => {

    Posts.insert(req.body)
    .then((post) => {
      res.json(post)
    })
    .catch(next)
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});


router.use((err,req,res,next) => { //eslint-disable-line
  res.status(500).json({
    message:err.message,
    stack:err.stack 
  })
})
// do not forget to export the router
module.exports = router