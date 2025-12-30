import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const RequireAuth = ({ children, adminOnly = false }) => {
  const user = localStorage.getItem("userId");
  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  const location = useLocation();

  // ❌ Not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ path: location.pathname }}
      />
    );
  }

  // 🔒 Admin pages only
  if (adminOnly && !roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  adminOnly: PropTypes.bool,
};

export default RequireAuth;
