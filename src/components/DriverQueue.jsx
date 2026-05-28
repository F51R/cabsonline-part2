import { getBookings, assignDriver, completeBooking } from "../data/mockBookings";

function DriverQueue({ bookings, refreshBookings }) {
  const availableBookings = bookings.filter(
    (booking) => booking.status === "unassigned" || booking.status === "assigned"
  );

  function handleAccept(reference) {
    assignDriver(reference, "D001 - Alex Driver");
    refreshBookings();
  }

  function handleComplete(reference) {
    completeBooking(reference);
    refreshBookings();
  }

  return (
    <section className="card">
      <h2>Driver Job Queue</h2>
      <p className="section-text">
        Drivers can view available jobs, accept bookings, and mark rides as
        completed.
      </p>

      {availableBookings.length === 0 ? (
        <p>No active jobs available.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Pickup</th>
                <th>Destination</th>
                <th>Date and Time</th>
                <th>Status</th>
                <th>Driver Action</th>
              </tr>
            </thead>
            <tbody>
              {availableBookings.map((booking) => (
                <tr key={booking.reference}>
                  <td>{booking.reference}</td>
                  <td>{booking.pickupSuburb}</td>
                  <td>{booking.destinationSuburb}</td>
                  <td>{booking.pickupDate} {booking.pickupTime}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status === "unassigned" ? (
                      <button onClick={() => handleAccept(booking.reference)}>
                        Accept as D001
                      </button>
                    ) : (
                      <button onClick={() => handleComplete(booking.reference)}>
                        Complete Ride
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default DriverQueue;