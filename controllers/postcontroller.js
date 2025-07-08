const Post = require('../models/Post')
const mongoose = require('mongoose')


const getPosts = async (req, res) => {
   const page = parseInt(req.query.page) || 1 // default to page 1 if not provided
   const limit = parseInt(req.query.limit) || 10 // default to 10 posts per page

   const skip = (page - 1) * limit
   try{
      const posts = await Post.find().skip(skip).limit(limit)
      const totalPosts = await Post.countDocuments() 
      res.status(200).json({success: true, posts, totalPosts, totalPages: Math.ceil(totalPosts/ limit), currentPage: page})
   }catch(err){
      res.status(500).json({success: false, message:'Error getting posts', err})
   }
}


const createPost = async (req, res) => {
   const { title, content, author} = req.body
   if (!title || !content || !author) {
      return res.status(400).json({ message: 'All fields are required' });
    }
   try {
      const posts = new Post({title, author, content})
      await posts.save()
      res.json({posts, success: true, message: 'Post successfully created'})
   } catch (error) {
      res.status(500).json({ success : false , message: 'Error creating post', error})
   }
}

const deletePost = async(req, res) => {
   const { id } = req.params;

   // Check if the provided ID is a valid MongoDB ObjectId
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
   } 
   try {
      const posts = await Post.findByIdAndDelete(req.params.id)
      if(!posts) {
         return res.status(404).json({success: false, message: 'Post not found' })
      }
      res.json({message: 'Post deleted successfully'})
   } catch (error) {
      res.status(500).json({success: false , message: 'Error Deleting post', error})
   }
}

const updatePost = async (req, res) => {
   try {
      const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      if(!posts){
         res.status(400).json({success:false, message:'Post not found'})
      }
      res.json({posts, success: true, message: 'Post updated successfuly'})
   } catch (error) {
      res.status(500).json({success: false, error, message: 'Error Updating post'})
   }   
}

const getPostById = async (req, res) => {
   try {
      const posts = await Post.findById(req.params.id)
      if(!posts){
         res.status(404).json({success: false, message: 'Post not found' })
      }
      res.json(posts)
      }catch(error){
         res.status(500).json({success: false, message: 'Error getting post', error})
      }
}

const searchPost = async (req, res) => {
   try {
       const term = req.query.term?.trim(); // Get the search term from the query
       if (!term) {
         return res.status(400).json({ success: false, message: 'Search term is required' });
     }

       const posts = await Post.find({
           $or: [
               { title: { $regex: term, $options: 'i' } },
               { content: { $regex: term, $options: 'i' } }
           ]
       });
       
       if (posts.length === 0) {
           return res.status(404).json({ success: false, message: 'No posts found' });
       }

       res.status(200).json({ success: true, data: posts });
   } catch (error) {
       console.error("Error getting posts:", error);
       res.status(500).json({ success: false, message: 'Error getting posts', error });
   }
};



module.exports = { createPost, getPostById, getPosts,searchPost, deletePost, updatePost}