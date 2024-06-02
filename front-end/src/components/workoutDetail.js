import React, { useState } from 'react';

const WorkoutDetail = ({ workout, fetchWorkouts }) => {
  // State to hold error message, if any
  const [error, setError] = useState(null);

  // Function to handle delete button click
  const handleClick = async () => {
    try {
      // Retrieve user from local storage
      const user = JSON.parse(localStorage.getItem('user'));
      
      // Send DELETE request to delete the workout
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });

      // Check if deletion was successful
      if (!response.ok) {
        throw new Error('Failed to delete workout');
      }

      // Feedback for successful deletion
      console.log('Workout deleted successfully');

      // Fetch the updated list of workouts after deletion
      fetchWorkouts();
    } catch (error) {
      // Display error message to the user
      setError('Failed to delete workout. Please try again later.');
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      {/* Delete button */}
      <span className="material-symbols-outlined red" onClick={handleClick}>delete</span>
      {/* Display error message if deletion fails */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default WorkoutDetail;
