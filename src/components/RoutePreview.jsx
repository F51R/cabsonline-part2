import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents
} from "react-leaflet";

function MapClickHandler({ selectionMode, setPickup, setDestination }) {
  useMapEvents({
    click(event) {
      const clickedPoint = {
        lat: event.latlng.lat,
        lng: event.latlng.lng
      };

      if (selectionMode === "pickup") {
        setPickup(clickedPoint);
      } else {
        setDestination(clickedPoint);
      }
    }
  });

  return null;
}

function RoutePreview() {
  const aucklandCenter = [-36.8485, 174.7633];

  const [selectionMode, setSelectionMode] = useState("pickup");
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);

  const routeLine =
    pickup && destination
      ? [
          [pickup.lat, pickup.lng],
          [destination.lat, destination.lng]
        ]
      : [];

  return (
    <section className="card">
      <h2>Interactive Route Preview</h2>

      <p className="section-text">
        Choose pickup or destination, then click on the map to set the location.
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
          className={selectionMode === "destination" ? "active-map-button" : ""}
          onClick={() => setSelectionMode("destination")}
        >
          Select Destination
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={() => {
            setPickup(null);
            setDestination(null);
          }}
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

          <MapClickHandler
            selectionMode={selectionMode}
            setPickup={setPickup}
            setDestination={setDestination}
          />

          {pickup && (
            <Marker position={[pickup.lat, pickup.lng]}>
              <Popup>
                Pickup Location
                <br />
                {pickup.lat.toFixed(5)}, {pickup.lng.toFixed(5)}
              </Popup>
            </Marker>
          )}

          {destination && (
            <Marker position={[destination.lat, destination.lng]}>
              <Popup>
                Destination Location
                <br />
                {destination.lat.toFixed(5)}, {destination.lng.toFixed(5)}
              </Popup>
            </Marker>
          )}

          {pickup && destination && <Polyline positions={routeLine} />}
        </MapContainer>
      </div>

      <div className="route-info">
        <p>
          <strong>Current mode:</strong>{" "}
          {selectionMode === "pickup" ? "Selecting pickup" : "Selecting destination"}
        </p>

        <p>
          <strong>Pickup:</strong>{" "}
          {pickup
            ? `${pickup.lat.toFixed(5)}, ${pickup.lng.toFixed(5)}`
            : "Not selected"}
        </p>

        <p>
          <strong>Destination:</strong>{" "}
          {destination
            ? `${destination.lat.toFixed(5)}, ${destination.lng.toFixed(5)}`
            : "Not selected"}
        </p>
      </div>
    </section>
  );
}

export default RoutePreview;