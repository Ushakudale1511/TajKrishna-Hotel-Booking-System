import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logout from "../auth/Logout";

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = () => setShowAccount(prev => !prev);

  const isLoggedIn = localStorage.getItem("token");

  const roles = JSON.parse(localStorage.getItem("roles")) || [];

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
      <div className="container-fluid">

        <Link to="/" className="navbar-brand">
          <span className="hotel-color fw-bold fs-3" style={{ color: "maroon" }}>
            Taj Krishna
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to="/browse-all-rooms">
                Explore rooms
              </NavLink>
            </li>

            {isLoggedIn && roles.includes("ROLE_ADMIN") && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}

          </ul>

          <ul className="navbar-nav d-flex">

            <li className="nav-item">
              <NavLink className="nav-link" to="/find-booking">
                Find my booking
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link p-0"
                onClick={handleAccountClick}
              >
                Account
              </button>

              <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}>
                {isLoggedIn ? (
                  <Logout />
                ) : (
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
