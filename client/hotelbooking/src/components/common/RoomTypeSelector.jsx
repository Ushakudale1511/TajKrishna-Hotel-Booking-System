import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRoomTypes() {
      try {
        const data = await getRoomTypes();
        setRoomTypes(data || []);
      } catch (err) {
        console.error("Error fetching room types:", err);
        setError("Unable to load room types");
      }
    }

    fetchRoomTypes();
  }, []);

  const handleAddNewRoomType = () => {
    if (!newRoomType.trim()) return;

    // avoid duplicates
    if (roomTypes.includes(newRoomType.trim())) {
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
      return;
    }

    setRoomTypes([...roomTypes, newRoomType.trim()]);
    setNewRoomType("");
    setShowNewRoomTypeInput(false);
  };

  return (
    <>
      <div>
        <select
          required
          className="form-select"
          name="roomType"
          value={newRoom.roomType}
          onChange={(e) => {
            if (e.target.value === "Add New") {
              setShowNewRoomTypeInput(true);
            } else {
              setShowNewRoomTypeInput(false);
              handleRoomInputChange(e);
            }
          }}
        >
          <option value="">Select a room type</option>
          <option value="Add New">Add New</option>

          {roomTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        {error && <p className="text-danger mt-2">{error}</p>}

        {showNewRoomTypeInput && (
          <div className="mt-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter New Room Type"
                value={newRoomType}
                onChange={(e) => setNewRoomType(e.target.value)}
              />
              <button
                className="btn btn-hotel"
                type="button"
                onClick={handleAddNewRoomType}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

RoomTypeSelector.propTypes = {
  handleRoomInputChange: PropTypes.func.isRequired,
  newRoom: PropTypes.shape({
    roomType: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoomTypeSelector;
