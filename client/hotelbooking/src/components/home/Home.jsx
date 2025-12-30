import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MainHeader from "../layout/MainHeader";
import RoomSearch from "../common/RoomSearch";
import RoomCarousel from "../common/RoomCarousel";
import Parallax from "../common/Parallax";
import HotelService from "../common/HotelService";

import "../../index.css";

const Home = () => {
  const { state } = useLocation();
  const message = state?.message || "";

  const [currentUser, setCurrentUser] = useState(
    () => localStorage.getItem("userId") || null
  );

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userId");
    setCurrentUser(user);

    const isNewLogin = localStorage.getItem("newLogin");

    if (isNewLogin && user) {
      setShowPopup(true);
      localStorage.removeItem("newLogin");

      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section>
      {message && (
        <p className="text-warning px-5 text-center" aria-live="polite">
          {message}
        </p>
      )}

      {currentUser && showPopup && (
        <div className="welcome-popup">
          <h3>Welcome back, {currentUser}!</h3>
        </div>
      )}

      <MainHeader />

      <div className="container">
        <RoomSearch />

        <RoomCarousel title="Featured Rooms" />

        <Parallax />

        <RoomCarousel title="Recommended Rooms" />

        <HotelService />

        <br />
        <br />
      </div>
    </section>
  );
};

export default Home;
