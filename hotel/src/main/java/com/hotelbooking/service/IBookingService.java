package com.hotelbooking.service;

import java.util.List;

import com.hotelbooking.entity.BookedRoom;

public interface IBookingService {

    List<BookedRoom> getAllBookingsByRoomId(Long roomId);

    void cancelBooking(Long bookingId);

    // ⭐ return BookedRoom (NOT String)
    BookedRoom saveBooking(Long roomId, BookedRoom bookingRequest);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();

    // ⭐ SEARCH BY EMAIL
    List<BookedRoom> getBookingsByUserEmail(String email);
}
