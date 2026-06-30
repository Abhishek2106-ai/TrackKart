import "../styles/stores.css";

const stores = [
  {
    name: "Amazon",
    status: "Supported",
    color: "#FF9900",
  },
  {
    name: "Flipkart",
    status: "Supported",
    color: "#2874F0",
  },
  {
    name: "Myntra",
    status: "Coming Soon",
    color: "#FF3F6C",
  },
  {
    name: "Ajio",
    status: "Coming Soon",
    color: "#111827",
  },
  {
    name: "Croma",
    status: "Coming Soon",
    color: "#00AEEF",
  },
  {
    name: "Reliance",
    status: "Coming Soon",
    color: "#0055A5",
  },
];

function StoreSection() {
  return (
    <section
      className="stores-section"
      id="stores"
    >
      <div className="stores-heading">

        <span>
          Supported Platforms
        </span>

        <h2>
          Shop Anywhere.
          Track Everywhere.
        </h2>

        <p>
          TrackKart is expanding support for India's
          biggest shopping platforms.
        </p>

      </div>

      <div className="stores-marquee">

  <div className="stores-track">

    {[...stores, ...stores].map((store, index) => (

      <div
        className="store-pill"
        key={`${store.name}-${index}`}
      >

        <div
          className="store-logo"
          style={{
            background: store.color,
          }}
        >
          {store.name[0]}
        </div>

        <div className="store-info">

          <h3>{store.name}</h3>

          <span
            className={
              store.status === "Supported"
                ? "supported"
                : "coming"
            }
          >
            {store.status}
          </span>

        </div>

      </div>

    ))}

  </div>

</div>

    </section>
  );
}

export default StoreSection;