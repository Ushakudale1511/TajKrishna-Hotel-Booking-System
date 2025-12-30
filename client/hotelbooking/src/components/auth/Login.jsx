import { useState } from "react";
import { loginUser } from "../utils/ApiFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import "../../Login.css";

const Login = () => {
  const [msg, setMsg] = useState("");

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(login);

      const token = res.token;
      const userId = res.id;
      const email = res.email;
      const role = res.roles?.[0] || "";

      handleLogin(token, userId, role);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);
      localStorage.setItem("userRole", role);

      // ⭐ STORE ALL ROLES (VERY IMPORTANT)
      localStorage.setItem("roles", JSON.stringify(res.roles || []));

      navigate(redirectUrl, { replace: true });

    } catch (err) {
      setMsg("Invalid email or password");
    }

    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {msg && <p className="alert alert-danger text-center">{msg}</p>}

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            value={login.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            value={login.password}
            onChange={handleChange}
          />

          <button className="btn-login" type="submit">
            Login
          </button>

          <p className="text-center mt-2">
            Don’t have an account?
            <Link to="/register"> Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
