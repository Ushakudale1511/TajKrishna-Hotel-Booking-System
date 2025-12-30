import { useState } from "react";
import { registerUser } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import "../../Registration.css";

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: [{ name: "ROLE_USER" }],
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistration((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser(registration);

      setSuccessMessage(
        typeof result === "string" ? result : "Registration successful!"
      );
      setErrorMessage("");

      setRegistration({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roles: [{ name: "ROLE_USER" }],
      });
    } catch (error) {
      const readable =
        typeof error?.response?.data === "string"
          ? error.response.data
          : error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Registration failed";

      setErrorMessage(readable);
      setSuccessMessage("");
    }

    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="registration-page">
      <div className="registration-card">
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        {successMessage && (
          <p className="alert alert-success">{successMessage}</p>
        )}

        <h2>Create an Account</h2>

        <form onSubmit={handleRegistration}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              name="firstName"
              type="text"
              className="form-control"
              value={registration.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              name="lastName"
              type="text"
              className="form-control"
              value={registration.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={registration.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={registration.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-register">
            Register
          </button>

          <div className="mt-3 text-center">
            Already have an account?
            <Link className="fw-bold ms-1" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
