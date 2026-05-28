import { useState } from "react";
import { assignDriver, unassignDriver } from "../data/mockBookings";

function AdminDashboard({ bookings, refreshBookings }) {
    const [selectedDriver, setSelectedDriver] = useState("D001 - Alex Driver");
    const [message, setMessage] = useState("");

    const drivers = [
        "D001 - Alex Driver",
        "D002 - Liam Brown",
        "D003 - Emma Wilson"
    ];

    function handleAssign(reference) {
        assignDriver(reference, selectedDriver);
        setMessage(`Booking ${reference} has been assigned to ${selectedDriver}.`);
        refreshBookings();
    }

    function handleUnassign(reference) {
        unassignDriver(reference);
        setMessage(`Booking ${reference} has been changed back to unassigned.`);
        refreshBookings();
    }

    return (
        <section className="card">
            <h2>Admin Assignment Dashboard</h2>
            <p className="section-text">
                Admin staff can assign drivers to unassigned taxi bookings.
            </p>

            <label className="driver-select">
                Select Driver
                <select
                    value={selectedDriver}
                    onChange={(event) => setSelectedDriver(event.target.value)}
                >
                    {drivers.map((driver) => (
                        <option key={driver} value={driver}>
                            {driver}
                        </option>
                    ))}
                </select>
            </label>

            {message && <p className="message">{message}</p>}

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Reference</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Pickup</th>
                            <th>Destination</th>
                            <th>Status</th>
                            <th>Driver</th>
                            <th>Assign</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.reference}>
                                <td>{booking.reference}</td>
                                <td>{booking.customerName}</td>
                                <td>{booking.phone}</td>
                                <td>{booking.pickupSuburb}</td>
                                <td>{booking.destinationSuburb}</td>
                                <td>{booking.status}</td>
                                <td>{booking.driver || "Not assigned"}</td>
                                <td>
                                    {booking.status === "unassigned" ? (
                                        <button onClick={() => handleAssign(booking.reference)}>
                                            Assign
                                        </button>
                                    ) : (
                                        <button onClick={() => handleUnassign(booking.reference)}>
                                            Unassign
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default AdminDashboard;