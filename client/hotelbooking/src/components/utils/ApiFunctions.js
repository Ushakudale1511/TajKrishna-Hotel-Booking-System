import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// 🔹 ALWAYS send token properly
export const getHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      "Content-Type": "application/json",
    };
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/* -------- ROOMS -------- */

export function addRoom(formData) {
  return api.post("/rooms/add/new-room", formData, {
    headers: {
      ...getHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getRoomTypes() {
  const response = await api.get("/rooms/room/types");
  return response.data;
}

export async function getAllRooms() {
  const result = await api.get("/rooms/all-rooms");
  return result.data;
}

export async function deleteRoom(roomId) {
  const result = await api.delete(`/rooms/delete/room/${roomId}`, {
    headers: getHeader(),
  });
  return result.data;
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);

  const response = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: {
      ...getHeader(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function getRoomById(roomId) {
  const result = await api.get(`/rooms/room/${roomId}`);
  return result.data;
}

/* -------- BOOKINGS -------- */

export async function bookRoom(roomId, booking) {
  const response = await api.post(
    `/bookings/room/${roomId}/booking`,
    booking,
    { headers: getHeader() }
  );
  return response.data;
}

export async function getAllBookings() {
  const result = await api.get("/bookings/all-bookings", {
    headers: getHeader(),
  });
  return result.data;
}

// ⭐ PUBLIC — NO TOKEN
export async function getBookingByConfirmationCode(code) {
  const result = await api.get(`/bookings/confirmation/${code}`);
  return result.data;
}

export async function cancelBooking(bookingId) {
  const result = await api.delete(`/bookings/booking/${bookingId}/delete`, {
    headers: getHeader(),
  });
  return result.status >= 200 && result.status < 300;
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  const result = await api.get(
    `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
  );
  return result.data;
}

/* -------- AUTH -------- */

export async function registerUser(registration) {
  const response = await api.post("/auth/register-user", registration);
  return response.data;
}

export async function loginUser(login) {
  const response = await api.post("/auth/login", login);
  return response.data;
}

/* -------- USERS -------- */

// 👉 GET USER BY EMAIL
export async function getUser(email) {
  const res = await api.get(`/users/${email}`, {
    headers: getHeader(),
  });
  return res.data;
}

// 👉 DELETE USER (email)
export async function deleteUser(email) {
  const response = await api.delete(`/users/delete/${email}`, {
    headers: getHeader(),
  });
  return response.data;
}

/* BOOKINGS BY USER (email) */
export async function getBookingsByUserEmail(email) {
  const response = await api.get(`/bookings/user/${email}`, {
    headers: getHeader(),
  });
  return response.data;
}
