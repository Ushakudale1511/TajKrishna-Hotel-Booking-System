import { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

const EditRoom = () => {
  const [room, setRoom] = useState({
    roomType: "",
    roomPrice: "",
    photo: null,        // ⭐ always file (or null)
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { roomId } = useParams();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRoom({ ...room, photo: file });

    setImagePreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setRoom((prev) => ({
      ...prev,
      [name]: name === "roomPrice" ? Number(value) || "" : value,
    }));
  };

  useEffect(() => {
    async function fetchRoom() {
      try {
        const data = await getRoomById(roomId);

        setRoom({
          roomType: data.roomType,
          roomPrice: data.roomPrice,
          photo: null,                     // ⭐ important
        });

        if (data.photo) {
          setImagePreview(`data:image/jpeg;base64,${data.photo}`);
        }
      } catch (err) {
        setErrorMessage("Failed to load room");
      }
    }

    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("roomType", room.roomType);
      formData.append("roomPrice", room.roomPrice);

      if (room.photo) {
        formData.append("photo", room.photo);
      }

      const res = await updateRoom(roomId, formData);

      if (res) {
        setSuccessMessage("Room updated successfully!");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center mb-5 mt-5">Edit Room</h3>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Room Type</label>
              <input
                className="form-control"
                type="text"
                name="roomType"
                value={room.roomType}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Room Price</label>
              <input
                className="form-control"
                type="number"
                name="roomPrice"
                value={room.roomPrice}
                onChange={handleInputChange}
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

            <div className="d-flex gap-2 mt-2">
              <Link to="/existing-rooms" className="btn btn-outline-info">
                Back
              </Link>

              <button className="btn btn-outline-warning">
                Update Room
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default EditRoom;
