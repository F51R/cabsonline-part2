const initialBookings = [
  {
    reference: "BRN00001",
    customerName: "John Smith",
    phone: "0211234567",
    pickupSuburb: "Auckland CBD",
    destinationSuburb: "Northcote",
    pickupDate: "2026-05-28",
    pickupTime: "15:30",
    status: "unassigned",
    driver: "",
    fare: 28.5,
    paymentStatus: "unpaid"
  },
  {
    reference: "BRN00002",
    customerName: "Mary Chen",
    phone: "0217654321",
    pickupSuburb: "Newmarket",
    destinationSuburb: "Takapuna",
    pickupDate: "2026-05-28",
    pickupTime: "16:15",
    status: "assigned",
    driver: "D001 - James Charles",
    fare: 34.0,
    paymentStatus: "paid"
  }
];

export function getBookings() {
  const storedBookings = localStorage.getItem("cabsonline_bookings");

  if (storedBookings) {
    return JSON.parse(storedBookings);
  }

  localStorage.setItem("cabsonline_bookings", JSON.stringify(initialBookings));
  return initialBookings;
}

export function saveBookings(bookings) {
  localStorage.setItem("cabsonline_bookings", JSON.stringify(bookings));
}

export function createBooking(newBooking) {
  const bookings = getBookings();

  const nextNumber = bookings.length + 1;
  const reference = "BRN" + String(nextNumber).padStart(5, "0");

  const booking = {
    reference,
    ...newBooking,
    status: "unassigned",
    driver: "",
    paymentStatus: "unpaid"
  };

  bookings.push(booking);
  saveBookings(bookings);

  return booking;
}

export function findBooking(reference) {
  const bookings = getBookings();
  return bookings.find((booking) => booking.reference === reference);
}

export function assignDriver(reference, driverName) {
  const bookings = getBookings();

  const updatedBookings = bookings.map((booking) => {
    if (booking.reference === reference) {
      return {
        ...booking,
        status: "assigned",
        driver: driverName
      };
    }

    return booking;
  });

  saveBookings(updatedBookings);
  return updatedBookings;
}

export function completeBooking(reference) {
  const bookings = getBookings();

  const updatedBookings = bookings.map((booking) => {
    if (booking.reference === reference) {
      return {
        ...booking,
        status: "completed",
        paymentStatus: "paid"
      };
    }

    return booking;
  });

  saveBookings(updatedBookings);
  return updatedBookings;
}

export function unassignDriver(reference) {
  const bookings = getBookings();

  const updatedBookings = bookings.map((booking) => {
    if (booking.reference === reference) {
      return {
        ...booking,
        status: "unassigned",
        driver: ""
      };
    }

    return booking;
  });

  saveBookings(updatedBookings);
  return updatedBookings;
}