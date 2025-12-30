import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Welcome to Admin panel</h2>
      <hr />
      <div className="admin-links">
        <Link to={"/existing-rooms"} className="btn btn-primary m-2">
          Manage Rooms
        </Link>
        <Link to={"/existing-bookings"} className="btn btn-primary m-2">
          Manage Bookings
        </Link>
      </div>
    </section>
  );
};

export default Admin;
