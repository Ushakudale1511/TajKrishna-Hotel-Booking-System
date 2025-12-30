package com.hotelbooking.controller;

import com.hotelbooking.entity.BookedRoom;
import com.hotelbooking.entity.Room;
import com.hotelbooking.entity.User;
import com.hotelbooking.response.BookingResponse;
import com.hotelbooking.response.RoomResponse;
import com.hotelbooking.service.IBookingService;
import com.hotelbooking.service.IRoomService;
import com.hotelbooking.service.IUserService;
import com.hotelbooking.exception.ResourceNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final IBookingService bookingService;
    private final IRoomService roomService;
    private final IUserService userService;

    public BookingController(
            IBookingService bookingService,
            IRoomService roomService,
            IUserService userService
    ) {
        this.bookingService = bookingService;
        this.roomService = roomService;
        this.userService = userService;
    }

    // ⭐ CREATE BOOKING (logged-in user)
    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> bookRoom(
            @PathVariable Long roomId,
            @RequestBody BookedRoom booking,
            Principal principal
    ) {
        String email = principal.getName();
        User user = userService.getUser(email);

        booking.setUser(user);

        BookedRoom saved = bookingService.saveBooking(roomId, booking);

        return ResponseEntity.ok(getBookingResponse(saved));
    }

    // ⭐ GET BOOKING BY CONFIRMATION CODE
    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(
            @PathVariable String confirmationCode) {

        try {
            BookedRoom booking =
                    bookingService.findByBookingConfirmationCode(confirmationCode);

            return ResponseEntity.ok(getBookingResponse(booking));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Booking not found");
        }
    }

    // ⭐ PROFILE — BOOKINGS BY USER EMAIL
    @GetMapping("/user/{email}")
    public ResponseEntity<List<BookingResponse>> getBookingsByUser(
            @PathVariable String email
    ) {
        List<BookedRoom> bookings =
                bookingService.getBookingsByUserEmail(email);

        List<BookingResponse> responses = new ArrayList<>();

        for (BookedRoom booking : bookings) {
            responses.add(getBookingResponse(booking));
        }

        return ResponseEntity.ok(responses);
    }

    // ⭐ ADMIN — GET ALL BOOKINGS
    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {

        List<BookedRoom> bookings = bookingService.getAllBookings();

        List<BookingResponse> responses = new ArrayList<>();

        for (BookedRoom booking : bookings) {
            responses.add(getBookingResponse(booking));
        }

        return ResponseEntity.ok(responses);
    }

    // ⭐ CANCEL BOOKING
    @DeleteMapping("/booking/{id}/delete")
    public void cancel(@PathVariable("id") Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }

    // ⭐ Mapper — Entity → DTO
    private BookingResponse getBookingResponse(BookedRoom booking) {

        Room room = booking.getRoom();

        RoomResponse roomResp =
                new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice());

        return new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestFullName(),
                booking.getGuestEmail(),
                booking.getNumOfAdults(),
                booking.getNumOfChildren(),
                booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(),
                roomResp
        );
    }
}
