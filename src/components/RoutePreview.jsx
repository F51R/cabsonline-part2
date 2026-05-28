function RoutePreview() {
  return (
    <section className="card">
      <h2>Route Preview</h2>

      <p className="section-text">
        This feature uses OpenStreetMap to show a map-based taxi route preview
        between Auckland CBD and Northcote.
      </p>

      <div className="iframe-map-box">
        <iframe
          title="Auckland CBD to Northcote Map"
          width="100%"
          height="500px"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://www.openstreetmap.org/export/embed.html?bbox=174.7200%2C-36.8750%2C174.8100%2C-36.7700&layer=mapnik&marker=-36.8485%2C174.7633"
        ></iframe>
      </div>

      <div className="route-info">
        <p>
          <strong>Pickup:</strong> Auckland CBD
        </p>
        <p>
          <strong>Destination:</strong> Northcote
        </p>
        <p>
          <strong>Estimated travel time:</strong> 18–30 minutes
        </p>
        <p>
          <strong>Map provider:</strong> OpenStreetMap
        </p>
      </div>
    </section>
  );
}

export default RoutePreview;