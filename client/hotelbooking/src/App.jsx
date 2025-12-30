import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home/Home";
import ExistingRooms from "./components/room/ExistingRooms";
import EditRoom from "./components/room/EditRoom";
import AddRoom from "./components/room/AddRoom";
import RoomListing from "./components/room/RoomListing";

import Admin from "./components/admin/Admin";

import Checkout from "./components/booking/Checkout";
import BookingSuccess from "./components/booking/BookingSuccess";
import Bookings from "./components/booking/Bookings";
import FindBooking from "./components/booking/FindBooking";

import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";

import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";

import { AuthProvider } from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";

import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          {/* USER PROTECTED ROUTES */}
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          <Route
            path="/book-room/:roomId"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />

          <Route
            path="/booking-success"
            element={
              <RequireAuth>
                <BookingSuccess />
              </RequireAuth>
            }
          />

          <Route
            path="/existing-bookings"
            element={
              <RequireAuth>
                <Bookings />
              </RequireAuth>
            }
          />

          <Route
            path="/find-booking"
            element={
              <RequireAuth>
                <FindBooking />
              </RequireAuth>
            }
          />

          {/* ⭐ ADMIN PROTECTED ROUTES */}
          <Route
            path="/existing-rooms"
            element={
              <RequireAuth adminOnly>
                <ExistingRooms />
              </RequireAuth>
            }
          />

          <Route
            path="/edit-room/:roomId"
            element={
              <RequireAuth adminOnly>
                <EditRoom />
              </RequireAuth>
            }
          />

          <Route
            path="/add-room"
            element={
              <RequireAuth adminOnly>
                <AddRoom />
              </RequireAuth>
            }
          />

          <Route
            path="/admin"
            element={
              <RequireAuth adminOnly>
                <Admin />
              </RequireAuth>
            }
          />

        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
