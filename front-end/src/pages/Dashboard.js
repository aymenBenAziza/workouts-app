import React, { useState, useEffect } from 'react';
import WorkoutDetail from '../components/workoutDetail';
import WorkoutForm from '../components/WorkoutForm';
import { redirect } from 'react-router-dom';
import { getWorkouts } from '../api';

// Function to check if user is logged in, redirect to login if not
export const loader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
        throw redirect('/login') // Redirect to login page if user is not found
    }
    return null
}


const Dashboard = () => {
    // State variables for workouts, loading state, and error handling
    const [workouts, setWorkouts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch workouts from API when component mounts
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const workouts = await getWorkouts(); // Parse response JSON
                setWorkouts(workouts); // Set workouts state with fetched data
            } catch (error) {
                setError(error.message); // Set error state if any error occurs
            } finally {
                setLoading(false); // Set loading state to false after fetch completes
            }
        };

        fetchWorkouts(); // Call fetchWorkouts function when component mounts
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    // Render loading message while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error message if any error occurs during fetch
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render dashboard content once data is loaded
    return (
        <div className="home">
            <div className="workouts">
                {/* Map through workouts array and render WorkoutDetail component for each workout */}
                {workouts.map(workout => (
                    <WorkoutDetail key={workout._id} workout={workout} />
                ))}
            </div>
            {/* Render WorkoutForm component */}
            <WorkoutForm />
        </div>
    );
};

export default Dashboard;
