export const getPriceTotal = (bookings) => {
     return bookings.reduce((acc, booking) => booking.totalPrice + acc, 0);
};
