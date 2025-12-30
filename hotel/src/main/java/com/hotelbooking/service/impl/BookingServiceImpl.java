package com.hotelbooking.service.impl;

import com.hotelbooking.entity.BookedRoom;
import com.hotelbooking.entity.Room;
import com.hotelbooking.entity.User;
import com.hotelbooking.exception.ResourceNotFoundException;
import com.hotelbooking.repository.BookingRepository;
import com.hotelbooking.repository.RoomRepository;
import com.hotelbooking.repository.UserRepository;
import com.hotelbooking.service.IBookingService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements IBookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public BookedRoom saveBooking(Long roomId, BookedRoom bookingRequest) {

        // ⭐ find room
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        bookingRequest.setRoom(room);

        // ⭐ attach logged-in user based on guest email
        User user = userRepository.findByEmail(bookingRequest.getGuestEmail())
                .orElse(null);    // जर user नसेल तर null ठेव (booking होईल)

        bookingRequest.setUser(user);

        // ⭐ generate confirmation code
        bookingRequest.setBookingConfirmationCode(
                "HB-" + System.currentTimeMillis()
        );

        return bookingRepository.save(bookingRequest);
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<BookedRoom> getBookingsByUserEmail(String email) {
        return bookingRepository.findByUser_Email(email);
    }
}
