const express = require('express');
const {
    getWorkOuts,
    getWorkOut,
    createWorkOut,
    deleteWorkOut,
    updateWorkOut
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

// Express router
const router = express.Router();

router.use(requireAuth)

// GET all workouts
router.get('/', getWorkOuts);

// GET a specific workout by ID
router.get('/:id', getWorkOut);

// POST a new workout
router.post('/', createWorkOut);

// DELETE a workout by ID
router.delete('/:id', deleteWorkOut);


module.exports = router;
