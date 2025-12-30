import { useEffect, useState } from "react";
import {
  deleteUser,
  getUser,
  getBookingsByUserEmail,
} from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: [{ id: "", name: "" }],
  });

  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");

  // 👉 FETCH USER
  useEffect(() => {
    if (!userEmail) return;

    async function loadUser() {
      try {
        const data = await getUser(userEmail);

        console.log("USER API RESPONSE:", data);

        // if backend sends { user: {...} }
        setUser(data?.user ? data.user : data);
      } catch (err) {
        console.error(err);
        setErrorMessage("Unable to load user profile");
      }
    }

    loadUser();
  }, [userEmail]);

  // 👉 FETCH BOOKINGS BY EMAIL
  useEffect(() => {
    if (!userEmail) return;

    async function loadBookings() {
      try {
        const data = await getBookingsByUserEmail(userEmail);

        console.log("BOOKINGS API:", data);

        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    }

    loadBookings();
  }, [userEmail]);

  // 👉 DELETE ACCOUNT
  const handleDeleteAccount = async () => {
    const ok = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!ok) return;

    try {
      await deleteUser(userEmail);
      localStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (err) {
      setErrorMessage("Failed to delete account");
    }
  };

  if (!token || !userEmail) {
    return (
      <p className="mt-5 text-center">
        Please login first to see your profile.
      </p>
    );
  }

  return (
    <div className="container">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
        <h4 className="card-title text-center">User Information</h4>

        <div className="card-body">
          <div className="col-md-10 mx-auto">
            <div className="card mb-3 shadow">
              <div className="row g-0">
                <div className="col-md-2 d-flex justify-content-center align-items-center mb-4">
                 <img
  src="https://cdn-icons-png.flaticon.com/512/2922/2922561.png"
  alt="Profile"
  className="rounded-circle"
  style={{ width: "110px", height: "110px", objectFit: "cover" }}
/>

                </div>

                <div className="col-md-10">
                  <div className="card-body">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>

                    <strong>Roles:</strong>
                    <ul>
                      {user.roles?.map((r) => (
                        <li key={r.id}>{r.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="card-title text-center">Booking History</h4>

            {Array.isArray(bookings) && bookings.length > 0 ? (
              <table className="table table-bordered table-hover shadow">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Room</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Code</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i}>
                      <td>{b.bookingId || b.id}</td>
                      <td>{b.room?.roomType}</td>
                      <td>{moment(b.checkInDate).format("MMM Do, YYYY")}</td>
                      <td>{moment(b.checkOutDate).format("MMM Do, YYYY")}</td>
                      <td>{b.bookingConfirmationCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No bookings.</p>
            )}

            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-danger btn-sm"
                onClick={handleDeleteAccount}
              >
                Close account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
