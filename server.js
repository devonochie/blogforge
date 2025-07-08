const express = require('express')
require('dotenv').config()
const postRoutes = require('./routes/postRoutes')
const connectDB = require('./config/db')
// connecct to database
connectDB()
// Initialze express
const app = express()
// middleware to parse json
app.use(express.json())

// blog post routes
app.use('/api/posts', postRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
   res.staus(500).json({success: false , message : err.message})
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
   console.log(`Server is Running at port: ${PORT}`)
})