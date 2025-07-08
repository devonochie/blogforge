const express = require('express')
const {searchPost, getPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postcontroller')
const router = express.Router()


//search for posts
router.get('/search', searchPost)

// get all post
router.get('/', getPosts)

//get a single post by id
router.get('/:id', getPostById)

//create a new post
router.post('/', createPost)

// update an existing post
router.put('/:id', updatePost)

// delete a post
router.delete('/:id', deletePost)




// exports router
module.exports = router