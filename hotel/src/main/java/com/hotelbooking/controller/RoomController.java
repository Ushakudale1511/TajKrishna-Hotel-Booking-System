package com.hotelbooking.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.hotelbooking.entity.BookedRoom;
import com.hotelbooking.entity.Room;
import com.hotelbooking.exception.PhotoRetrievalException;
import com.hotelbooking.exception.ResourceNotFoundException;
import com.hotelbooking.response.BookingResponse;
import com.hotelbooking.response.RoomResponse;
import com.hotelbooking.service.BookingService;
import com.hotelbooking.service.IRoomService;

import lombok.RequiredArgsConstructor;
//... वरचा सगळा code तसाच ठेऊ

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {

 private final IRoomService roomService;
 private final BookingService bookingService;

 // -------- ADD ROOM --------
 @PostMapping("/add/new-room")
 @PreAuthorize("hasRole('ROLE_ADMIN')")
 public ResponseEntity<RoomResponse> addNewRoom(
         @RequestParam MultipartFile photo,
         @RequestParam String roomType,
         @RequestParam BigDecimal roomPrice) throws SQLException, IOException {

     Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);

     return ResponseEntity.ok(
             new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice())
     );
 }

 @GetMapping("/room/types")
 public List<String> getRoomTypes() {
     return roomService.getAllRoomTypes();
 }

 @GetMapping("/all-rooms")
 public ResponseEntity<List<RoomResponse>> getAllRooms() {
     List<Room> rooms = roomService.getAllRooms();

     List<RoomResponse> responses = rooms.stream()
             .map(this::getRoomResponse)
             .toList();

     return ResponseEntity.ok(responses);
 }

 @GetMapping("/room/{roomId}")
 public ResponseEntity<RoomResponse> getRoomById(@PathVariable Long roomId) {

     Optional<Room> room = roomService.getRoomById(roomId);

     if (room.isEmpty()) {
         throw new ResourceNotFoundException("Room not found");
     }

     RoomResponse response = getRoomResponse(room.get());
     return ResponseEntity.ok(response);
 }

 // ⭐ PRIVATE HELPER
 private RoomResponse getRoomResponse(Room room) {
     List<BookedRoom> bookings = bookingService.getAllBookingsByRoomId(room.getId());

     List<BookingResponse> bookingInfo = bookings.stream()
             .map(b -> new BookingResponse(
                     b.getBookingId(),
                     b.getCheckInDate(),
                     b.getCheckOutDate(),
                     b.getBookingConfirmationCode()))
             .toList();

     byte[] bytes = null;
     Blob blob = room.getPhoto();

     if (blob != null) {
         try {
             bytes = blob.getBytes(1, (int) blob.length());
         } catch (SQLException e) {
             throw new PhotoRetrievalException("Error retrieving photo");
         }
     }

     return new RoomResponse(
             room.getId(),
             room.getRoomType(),
             room.getRoomPrice(),
             room.isBooked(),
             bytes,
             bookingInfo
     );
 }

 // ⭐ AVAILABLE ROOMS
 @GetMapping("/available-rooms")
 public ResponseEntity<List<RoomResponse>> getAvailableRooms(
         @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
         @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
         @RequestParam String roomType
 ) {
     List<Room> rooms = roomService.getAvailableRooms(checkInDate, checkOutDate, roomType);

     List<RoomResponse> responses = rooms.stream()
             .map(this::getRoomResponse)
             .toList();

     return ResponseEntity.ok(responses);
 }

 // ⭐ DELETE ROOM (ADMIN ONLY)
 @DeleteMapping("/delete/room/{roomId}")
 @PreAuthorize("hasRole('ROLE_ADMIN')")
 public ResponseEntity<String> deleteRoom(@PathVariable Long roomId) {

     roomService.deleteRoom(roomId);

     return ResponseEntity.ok("Room deleted successfully");
 }
}
