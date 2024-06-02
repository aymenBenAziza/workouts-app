export async function signup(formData) {
    const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    return response
}

export async function login(formData) {
    const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    return response
}


export const getWorkouts = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch('/api/workouts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch workouts'); // Throw error if response not ok
        return
    }

    const workouts = await response.json(); // Assuming the response is JSON
    return workouts
}