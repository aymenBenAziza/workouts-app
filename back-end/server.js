require('dotenv').config() // Load environment variables from a .env file

const express = require('express') // Import the Express library
const mongoose = require('mongoose') // Import the Mongoose library for MongoDB
const workoutRoutes = require('./routes/workouts') // Import workout routes
const userRoutes = require('./routes/user') // Import user routes

// Create an instance of an Express app
const app = express()

// Middleware to parse incoming JSON requests
app.use(express.json())
// Middleware to serve static files from the "build" directory of the front-end
app.use(express.static("../front-end/build"))
// Middleware to parse URL-encoded data with the querystring library (extended: false)
app.use(express.urlencoded({extended : false}))

// Routes
app.use('/api/workouts', workoutRoutes) // Routes for workout-related requests
app.use('/api/user', userRoutes) // Routes for user-related requests

// Connect to the MongoDB database using the connection string from environment variables
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('connected to database')
    // Start the server and listen for requests on the port specified in environment variables
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err) // Log any errors that occur during the database connection
  })
