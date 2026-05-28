import { useEffect, useState } from "react";
import "./App.css";

import BookingForm from "./components/BookingForm";
import Tracking from "./components/Tracking";
import DriverQueue from "./components/DriverQueue";
import AdminDashboard from "./components/AdminDashboard";
import RoutePreview from "./components/RoutePreview";

import { getBookings } from "./data/mockBookings";

function App() {
  const [activeTab, setActiveTab] = useState("book");
  const [bookings, setBookings] = useState([]);

  function refreshBookings() {
    setBookings(getBookings());
  }

  useEffect(() => {
    refreshBookings();
  }, []);

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">CabsOnline Part 2</p>
          <h1>CabsOnline Premium</h1>
          <p>
            A React-based extension of the original PHP taxi booking system,
            including customer tracking, driver workflow, admin assignment, and
            fare estimation. :)
          </p>
        </div>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === "book" ? "active" : ""}
          onClick={() => setActiveTab("book")}
        >
          Book
        </button>

        <button
          className={activeTab === "track" ? "active" : ""}
          onClick={() => setActiveTab("track")}
        >
          Track
        </button>

        <button
          className={activeTab === "driver" ? "active" : ""}
          onClick={() => setActiveTab("driver")}
        >
          Driver
        </button>

        <button
          className={activeTab === "admin" ? "active" : ""}
          onClick={() => setActiveTab("admin")}
        >
          Admin
        </button>

        
      </nav>

      <main>
        {activeTab === "book" && (
          <BookingForm onBookingCreated={refreshBookings} />
        )}

        {activeTab === "track" && <Tracking />}

        {activeTab === "driver" && (
          <DriverQueue
            bookings={bookings}
            refreshBookings={refreshBookings}
          />
        )}

        {activeTab === "admin" && (
          <AdminDashboard
            bookings={bookings}
            refreshBookings={refreshBookings}
          />
        )}

        {activeTab === "route" && <RoutePreview />}
      </main>
    </div>
  );
}

export default App;