import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents
} from "react-leaflet";

import { createBooking } from "../data/mockBookings";

function calculateDistanceKm(pointA, pointB) {
  if (!pointA || !pointB) {
    return 0;
  }

  const earthRadiusKm = 6371;

  const lat1 = (pointA.lat * Math.PI) / 180;
  const lat2 = (pointB.lat * Math.PI) / 180;
  const deltaLat = ((pointB.lat - pointA.lat) * Math.PI) / 180;
  const deltaLng = ((pointB.lng - pointA.lng) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

function calculateMapFare(pickupPoint, destinationPoint) {
  const distanceKm = calculateDistanceKm(pickupPoint, destinationPoint);

  if (distanceKm === 0) {
    return 0;
  }

  const baseFare = 8;
  const ratePerKm = 2.4;
  const fare = baseFare + distanceKm * ratePerKm;

  return Number(fare.toFixed(2));
}

function formatMapLocation(point) {
  if (!point) {
    return "";
  }

  return `Map point (${point.lat.toFixed(5)}, ${point.lng.toFixed(5)})`;
}

function BookingMapSelector({
  selectionMode,
  pickupPoint,
  destinationPoint,
  setPickupPoint,
  setDestinationPoint,
  updateLocationFields
}) {
  useMapEvents({
    click(event) {
      const clickedPoint = {
        lat: event.latlng.lat,
        lng: event.latlng.lng
      };

      if (selectionMode === "pickup") {
        setPickupPoint(clickedPoint);
        updateLocationFields("pickup", clickedPoint);
      }

      if (selectionMode === "destination") {
        setDestinationPoint(clickedPoint);
        updateLocationFields("destination", clickedPoint);
      }
    }
  });

  return (
    <>
      {pickupPoint && (
        <Marker position={[pickupPoint.lat, pickupPoint.lng]}>
          <Popup>
            Pickup Location
            <br />
            {pickupPoint.lat.toFixed(5)}, {pickupPoint.lng.toFixed(5)}
          </Popup>
        </Marker>
      )}

      {destinationPoint && (
        <Marker position={[destinationPoint.lat, destinationPoint.lng]}>
          <Popup>
            Destination Location
            <br />
            {destinationPoint.lat.toFixed(5)}, {destinationPoint.lng.toFixed(5)}
          </Popup>
        </Marker>
      )}

      {pickupPoint && destinationPoint && (
        <Polyline
          positions={[
            [pickupPoint.lat, pickupPoint.lng],
            [destinationPoint.lat, destinationPoint.lng]
          ]}
        />
      )}
    </>
  );
}

function BookingForm({ onBookingCreated }) {
  const today = new Date().toISOString().split("T")[0];
  const aucklandCenter = [-36.8485, 174.7633];

  const [selectionMode, setSelectionMode] = useState("pickup");
  const [pickupPoint, setPickupPoint] = useState(null);
  const [destinationPoint, setDestinationPoint] = useState(null);

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

  const distanceKm = calculateDistanceKm(pickupPoint, destinationPoint);
  const fare = calculateMapFare(pickupPoint, destinationPoint);

  function updateLocationFields(type, point) {
    const locationText = formatMapLocation(point);

    if (type === "pickup") {
      setFormData((previousData) => ({
        ...previousData,
        pickupSuburb: locationText
      }));
    }

    if (type === "destination") {
      setFormData((previousData) => ({
        ...previousData,
        destinationSuburb: locationText
      }));
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function clearMapSelection() {
    setPickupPoint(null);
    setDestinationPoint(null);

    setFormData((previousData) => ({
      ...previousData,
      pickupSuburb: "",
      destinationSuburb: ""
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.customerName ||
      !formData.phone ||
      !formData.pickupDate ||
      !formData.pickupTime
    ) {
      setMessage("Please complete customer name, phone, pickup date, and pickup time.");
      return;
    }

    if (!pickupPoint || !destinationPoint) {
      setMessage("Please select both pickup and destination locations on the map.");
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
      pickupSuburb: formatMapLocation(pickupPoint),
      destinationSuburb: formatMapLocation(destinationPoint),
      pickupCoordinates: pickupPoint,
      destinationCoordinates: destinationPoint,
      distanceKm: Number(distanceKm.toFixed(2)),
      fare
    });

    setMessage(`Booking created successfully. Reference: ${booking.reference}`);

    setFormData({
      customerName: "",
      phone: "",
      pickupSuburb: "",
      destinationSuburb: "",
      pickupDate: today,
      pickupTime: "",
      paymentMethod: "card"
    });

    setPickupPoint(null);
    setDestinationPoint(null);
    setSelectionMode("pickup");

    onBookingCreated();
  }

  return (
    <section className="card">
      <h2>Smart Booking with Map Selection</h2>

      <p className="section-text">
        Enter your customer details, then select pickup and destination directly
        from the map. An estimated fare would be shown.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Customer Name
            <input
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </label>

          <label>
            Phone
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-12 digits"
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
        </div>

        <div className="map-booking-panel">
          <h3>Select Route on Map</h3>

          <p className="section-text">
            Current mode:{" "}
            <strong>
              {selectionMode === "pickup"
                ? "Selecting pickup location"
                : "Selecting destination location"}
            </strong>
          </p>

          <div className="map-controls">
            <button
              type="button"
              className={selectionMode === "pickup" ? "active-map-button" : ""}
              onClick={() => setSelectionMode("pickup")}
            >
              Select Pickup
            </button>

            <button
              type="button"
              className={
                selectionMode === "destination" ? "active-map-button" : ""
              }
              onClick={() => setSelectionMode("destination")}
            >
              Select Destination
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={clearMapSelection}
            >
              Clear Map
            </button>
          </div>

          <div className="leaflet-map-box">
            <MapContainer
              center={aucklandCenter}
              zoom={12}
              scrollWheelZoom={true}
              className="leaflet-map"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <BookingMapSelector
                selectionMode={selectionMode}
                pickupPoint={pickupPoint}
                destinationPoint={destinationPoint}
                setPickupPoint={setPickupPoint}
                setDestinationPoint={setDestinationPoint}
                updateLocationFields={updateLocationFields}
              />
            </MapContainer>
          </div>

          <div className="route-result-box">
            <h3>Selected Route</h3>

            <p>
              <strong>Pickup:</strong>{" "}
              {pickupPoint
                ? `${pickupPoint.lat.toFixed(5)}, ${pickupPoint.lng.toFixed(5)}`
                : "Not selected"}
            </p>

            <p>
              <strong>Destination:</strong>{" "}
              {destinationPoint
                ? `${destinationPoint.lat.toFixed(5)}, ${destinationPoint.lng.toFixed(5)}`
                : "Not selected"}
            </p>

            <p>
              <strong>Estimated Distance:</strong>{" "}
              {distanceKm ? `${distanceKm.toFixed(2)} km` : "Not available"}
            </p>

            <p>
              <strong>Estimated Fare:</strong> ${fare.toFixed(2)}
            </p>
          </div>
        </div>

        <button type="submit" className="submit-booking-button">
          Submit Booking
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </section>
  );
}

export default BookingForm;