import { useState } from "react";
import { findBooking } from "../data/mockBookings";

function Tracking() {
  const [reference, setReference] = useState("");
  const [booking, setBooking] = useState(null);
  const [message, setMessage] = useState("");

  function handleSearch(event) {
    event.preventDefault();

    if (!/^BRN[0-9]{5}$/.test(reference)) {
      setMessage("Please enter a valid booking reference, for example BRN00001.");
      setBooking(null);
      return;
    }

    const foundBooking = findBooking(reference);

    if (!foundBooking) {
      setMessage("No booking found with that reference number.");
      setBooking(null);
      return;
    }

    setBooking(foundBooking);
    setMessage("");
  }

  return (
    <section className="card">
      <h2>Customer Tracking</h2>
      <p className="section-text">
        Customers can check booking status, driver assignment, fare, and payment
        status.
      </p>

      <form onSubmit={handleSearch} className="search-row">
        <input
          value={reference}
          onChange={(event) => setReference(event.target.value.toUpperCase())}
          placeholder="BRN00001"
        />
        <button type="submit">Track Booking</button>
      </form>

      {message && <p className="message error">{message}</p>}

      {booking && (
        <div className="booking-card">
          <h3>{booking.reference}</h3>
          <p><strong>Customer:</strong> {booking.customerName}</p>
          <p><strong>Route:</strong> {booking.pickupSuburb} to {booking.destinationSuburb}</p>
          <p><strong>Pickup:</strong> {booking.pickupDate} at {booking.pickupTime}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <p><strong>Driver:</strong> {booking.driver || "Not assigned yet"}</p>
          <p><strong>Fare:</strong> ${booking.fare}</p>
          <p><strong>Payment:</strong> {booking.paymentStatus}</p>
        </div>
      )}
    </section>
  );
}

export default Tracking;