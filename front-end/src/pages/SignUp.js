import { useState } from "react";
import { signup } from "../api";
import { useNavigation } from "react-router-dom";
import { Spinner } from "@radix-ui/themes";

const Signup = () => {
  // State for form data, error message, and success message
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true)
    const response = await signup(formData)
    const json = await response.json();
    if (response.ok) {
      setSuccess("Signed up successfully! Go ahead and log in.");
      setError('');
    } else {
      setError(json.error);
      setSuccess('');
    }
    setIsSubmitting(false)
  };

  const navigation = useNavigation();

  // Render signup form
  return (
    <form className="signup" onSubmit={handleSubmit}>
      {/* Presentation */}
    <h2>Sign up</h2>
    <p>Join thousands of users achieving their fitness goals!</p>
    <p>Ready to start your journey?</p>
    <p>Sign up now and take the first step towards a healthier you!</p>
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
          {isSubmitting ? "Signing up" : "Sign up"}
          <span style={{ marginLeft: isSubmitting ? '8px' : '0' }}>
            {isSubmitting ? <Spinner /> : ""}
          </span>
        </button>
      {/* Error and success messages */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};

export default Signup;
