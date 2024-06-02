const { default: mongoose } = require('mongoose'); // Import the mongoose library
const Workout = require('../models/workout'); // Import the Workout model

// Controller function to handle GET request for all workouts
const getWorkOuts = async (req, res) => {
  const user_id = req.user._id; // Retrieve user ID from the request object
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 }); // Find all workouts for the user and sort by creation date

  res.status(200).json(workouts); // Respond with the workouts
}

// Controller function to handle GET request for a single workout by ID
const getWorkOut = async (req, res) => {
  const { id } = req.params; // Extract workout ID from request parameters

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' }); // If not valid, respond with an error
  }

  // Find the workout by ID
  const workout = await Workout.findById(id);

  // If workout with the provided ID is not found, respond with an error
  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  // Respond with the workout
  res.status(200).json(workout);
}

// Controller function to handle POST request to create a new workout
const createWorkOut = async (req, res) => {
  const { title, load, reps } = req.body; // Extract title, load, and reps from request body

  let emptyFields = [];

  // Check if required fields are empty
  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields }); // If any required field is empty, respond with an error
  }

  // Retrieve user ID from the request object
  const user_id = req.user._id;

  // Create and save the new workout to the database
  try {
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout); // Respond with the created workout
  } catch (error) {
    res.status(400).json({ error: error.message }); // If an error occurs during creation, respond with an error
  }
}

// Controller function to handle DELETE request to delete a workout by ID
const deleteWorkOut = async (req, res) => {
  const { id } = req.params; // Extract workout ID from request parameters

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' }); // If not valid, respond with an error
  }

  // Find and delete the workout by ID
  const workout = await Workout.findOneAndDelete({ _id: id });

  // If workout with the provided ID is not found, respond with an error
  if (!workout) {
    return res.status(400).json({ error: 'No such workout' });
  }

  // Respond with the deleted workout
  res.status(200).json(workout);
}

// Exporting all controller functions
module.exports = {
  getWorkOuts,
  getWorkOut,
  createWorkOut,
  deleteWorkOut,
};
