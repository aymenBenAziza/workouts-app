import { useState, useEffect } from "react";
import { login } from "../api";
import { Navigate } from "react-router-dom";
import { Spinner } from '@radix-ui/themes';

const Login = () => {
  // State for form data, error message, user data, and submission status
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect to check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData, // Spread the existing state
      [e.target.name]: e.target.value, // Update the specific field
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await login(formData);
    const json = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setError(json.error);
    } else {
      const userData = {
        email: formData.email,
        token: json.token
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
  };

  // If user is already logged in, redirect to homepage
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  // Render login form
  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        {/* Presentation */}
        <h2>Log in</h2>
        <p>Join thousands of users achieving their fitness goals!</p>
        <p>Ready to take the first step?</p>
        <p>Log in now to start tracking your progress!</p>
        {/* End Presentation */}

        {/* Form fields */}
        <label>Email address:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {/* Submit button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loging" : "Log in"}
          <span style={{ marginLeft: isSubmitting ? '8px' : '0' }}>
            {isSubmitting ? <Spinner /> : ""}
          </span>
        </button>
        {/* Error message */}
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default Login;
