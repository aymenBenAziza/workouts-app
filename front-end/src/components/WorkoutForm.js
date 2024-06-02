import { Spinner } from '@radix-ui/themes';
import React, { useState } from 'react';

const WorkoutForm = ({ fetchWorkouts }) => {
    // State variables to manage form inputs, errors, and submission status
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFieldsError] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Retrieve user data from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        const workout = { title, load, reps };
        
        try {
            // Send a POST request to the server
            const response = await fetch("/api/workouts", {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            // Parse response data
            const json = await response.json();

            // Handle errors returned by the server
            if (!response.ok) {
                setError(json.error);
                setEmptyFieldsError(json.emptyFields);
            } else {
                // Clear form inputs and fetch updated workouts if successful
                setError(null);
                setTitle('');
                setLoad('');
                setReps('');
                fetchWorkouts();
            }
        } catch (error) {
            // Handle unexpected errors
            setError("An error occurred. Please try again.");
            console.error("Error:", error);
        } finally {
            // Reset submission status
            setIsSubmitting(false);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            {/* Input fields for exercise title, load, and reps */}
            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Number of Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            {/* Submit button with spinner */}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding Workout" : "Add Workout"}
                <span aria-hidden="true" className="spinner">
                    {isSubmitting && <Spinner />}
                </span>
            </button>

            {/* Error messages */}
            {error && <div className="error">{error}</div>}
            {emptyFields.length > 0 && (
                <div className="error">Please fill in the following fields: {emptyFields.join(', ')}</div>
            )}
        </form>
    );
};

export default WorkoutForm;
