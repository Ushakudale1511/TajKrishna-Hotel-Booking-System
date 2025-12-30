import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";

const Logout = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const onLogout = () => {
    // clear everything
    handleLogout?.();

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      navigate("/", { replace: true });
    }, 2000);
  };

  return (
    <>
      {showPopup && (
        <div className="logout-popup">
          <p>You have been logged out successfully!</p>
        </div>
      )}

      {/* Profile link */}
      <li>
        <Link className="dropdown-item" to="/profile">
          Profile
        </Link>
      </li>

      <li>
        <hr className="dropdown-divider" />
      </li>

      {/* Logout button */}
      <button className="dropdown-item" onClick={onLogout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
