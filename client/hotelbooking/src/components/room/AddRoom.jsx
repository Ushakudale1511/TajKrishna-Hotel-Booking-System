import { useState } from "react";
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;

    setNewRoom((prev) => ({
      ...prev,
      [name]: name === "roomPrice" ? Number(value) || "" : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewRoom((prev) => ({ ...prev, photo: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("photo", newRoom.photo);
      formData.append("roomType", newRoom.roomType);
      formData.append("roomPrice", newRoom.roomPrice);

      const success = await addRoom(formData);

      if (success) {
        setSuccessMessage("A new room was added successfully!");
        setErrorMessage("");

        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
      } else {
        setErrorMessage("Error adding new room");
      }
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong");
      setSuccessMessage("");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          <h2 className="mt-4 mb-3">Add a New Room</h2>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Room Type</label>
              <RoomTypeSelector
                handleRoomInputChange={handleRoomInputChange}
                newRoom={newRoom}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Room Price</label>
              <input
                className="form-control"
                type="number"
                name="roomPrice"
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Room Photo</label>
              <input
                className="form-control"
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleImageChange}
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                  className="mt-3 rounded"
                />
              )}
            </div>

            <div className="d-flex gap-2">
              <Link to="/existing-rooms" className="btn btn-outline-info">
                Back
              </Link>

              <button type="submit" className="btn btn-outline-primary">
                Save Room
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default AddRoom;
