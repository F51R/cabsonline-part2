import { useState } from "react";
import { createBooking } from "../data/mockBookings";
import { calculateFare } from "../utils/fareCalculator";

function BookingForm({ onBookingCreated }) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    pickupSuburb: "",
    destinationSuburb: "",
    pickupDate: today,
    pickupTime: "",
    paymentMethod: "card"
  });

  const [message, setMessage] = useState("");
  const [fare, setFare] = useState(0);

  function handleChange(event) {
    const { name, value } = event.target;

    const updatedData = {
      ...formData,
      [name]: value
    };

    setFormData(updatedData);

    if (updatedData.pickupSuburb && updatedData.destinationSuburb) {
      setFare(
        calculateFare(updatedData.pickupSuburb, updatedData.destinationSuburb)
      );
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.customerName ||
      !formData.phone ||
      !formData.pickupSuburb ||
      !formData.destinationSuburb ||
      !formData.pickupDate ||
      !formData.pickupTime
    ) {
      setMessage("Please complete all required fields.");
      return;
    }

    if (!/^[0-9]{10,12}$/.test(formData.phone)) {
      setMessage("Phone number must contain 10 to 12 digits.");
      return;
    }

    const selectedDateTime = new Date(
      `${formData.pickupDate}T${formData.pickupTime}`
    );

    if (selectedDateTime < new Date()) {
      setMessage("Pickup date and time cannot be earlier than now.");
      return;
    }

    const booking = createBooking({
      ...formData,
      fare
    });

    setMessage(`Booking created successfully. Reference: ${booking.reference}`);
    onBookingCreated();
  }

  return (
    <section className="card">
      <h2>Smart Booking</h2>
      <p className="section-text">
        Create a taxi booking with validation, fare estimate, and mock payment
        method.
      </p>

      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Customer Name
          <input
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="John Smith"
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0211234567"
          />
        </label>

        <label>
          Pickup Suburb
          <input
            name="pickupSuburb"
            value={formData.pickupSuburb}
            onChange={handleChange}
            placeholder="Auckland CBD"
          />
        </label>

        <label>
          Destination Suburb
          <input
            name="destinationSuburb"
            value={formData.destinationSuburb}
            onChange={handleChange}
            placeholder="Northcote"
          />
        </label>

        <label>
          Pickup Date
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Pickup Time
          <input
            type="time"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
          />
        </label>

        <label>
          Payment Method
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="card">Card</option>
            <option value="cash">Cash</option>
            <option value="account">Business Account</option>
          </select>
        </label>

        <div className="fare-box">
          <strong>Estimated Fare:</strong>
          <span>${fare.toFixed(2)}</span>
        </div>

        <button type="submit">Submit Booking</button>
      </form>

      {message && <p className="message">{message}</p>}
    </section>
  );
}

export default BookingForm;