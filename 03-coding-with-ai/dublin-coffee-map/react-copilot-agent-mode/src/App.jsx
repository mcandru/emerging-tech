import React, { useRef, useState } from "react";
import MapView from "./MapView.jsx";

const coffeeShops = [
  {
    id: 1,
    name: "3fe",
    area: "Grand Canal Dock",
    address: "32-34 Grand Canal Street Lower, Dublin 2",
    coords: [53.3396, -6.2427],
    description:
      "The pioneer of Dublin's third-wave coffee scene. Exceptional roasts, minimalist industrial vibes, and a legendary tasting menu.",
  },
  {
    id: 2,
    name: "Kaph",
    area: "Creative Quarter",
    address: "31 Drury Street, Dublin 2",
    coords: [53.3419, -6.2638],
    description:
      "A hip, two-story independent coffee shop. Known for playing great vinyl, matcha lattes, and a paleo-friendly treat selection.",
  },
  {
    id: 3,
    name: "Brother Hubbard (North)",
    area: "Capel Street",
    address: "153 Capel Street, Dublin 1",
    coords: [53.3468, -6.2687],
    description:
      "Famous for its Middle Eastern-influenced brunch and excellent coffee. The Capel Street location is vibrant and spacious.",
  },
  {
    id: 4,
    name: "Clement & Pekoe",
    area: "South William St",
    address: "50 South William Street, Dublin 2",
    coords: [53.3414, -6.2625],
    description:
      "A community favorite with a famous street bench for people-watching. They offer a rotating guest espresso and loose-leaf teas.",
  },
  {
    id: 5,
    name: "Two Boys Brew",
    area: "Phibsborough",
    address: "375 North Circular Road, Dublin 7",
    coords: [53.3592, -6.2762],
    description:
      "A destination cafe in D7. Australian-style brunch, bright interiors, and consistently perfect flat whites.",
  },
  {
    id: 6,
    name: "Cloud Picker",
    area: "Pearse Street",
    address: "42 Pearse Street, Dublin 2",
    coords: [53.3444, -6.2464],
    description:
      "Located in the historic Science Gallery building. They roast their own beans and serve creative, seasonal breakfast dishes.",
  },
  {
    id: 7,
    name: "The Fumbally",
    area: "The Liberties",
    address: "Fumbally Lane, Dublin 8",
    coords: [53.3369, -6.2729],
    description:
      "A warehouse-style cafe and community hub. Rustic, wholesome food and a relaxed atmosphere that encourages lingering.",
  },
  {
    id: 8,
    name: "Bewley's Grafton Street",
    area: "Grafton Street",
    address: "78-79 Grafton Street, Dublin 2",
    coords: [53.3409, -6.2608],
    description:
      "An iconic Dublin landmark since 1927. Famous for its stained glass windows, mahogany interior, and traditional table service.",
  },
  {
    id: 9,
    name: "Proper Order Coffee Co",
    area: "Smithfield",
    address: "7 Haymarket, Smithfield, Dublin 7",
    coords: [53.3475, -6.2783],
    description:
      "Award-winning baristas serving some of the technically best coffee in the city. A small shop with a huge reputation.",
  },
  {
    id: 10,
    name: "Coffeeangel",
    area: "Trinity Street",
    address: "3 Trinity Street, Dublin 2",
    coords: [53.3438, -6.2612],
    description:
      "Reliable, high-quality coffee founded by barista champion Karl Purdy. Efficient service and great beans.",
  },
  {
    id: 11,
    name: "Vice Coffee Inc",
    area: "Abbey Street",
    address: "54 Middle Abbey Street, Dublin 1",
    coords: [53.3486, -6.2612],
    description:
      "Located inside the Wigwam building. Known for its edgy vibe, multi-roaster approach, and signature Irish coffees.",
  },
  {
    id: 12,
    name: "Love Supreme",
    area: "Stoneybatter",
    address: "57 Manor Street, Stoneybatter, Dublin 7",
    coords: [53.3546, -6.2868],
    description:
      "A neighborhood gem in trendy Stoneybatter. Known for its signature pies and excellent artisan coffee.",
  },
  {
    id: 13,
    name: "Two Pups Coffee",
    area: "The Liberties",
    address: "74 Francis Street, Dublin 8",
    coords: [53.3389, -6.2747],
    description:
      "Set in the antiques quarter, this spot loves dogs and serves top-tier coffee alongside hearty brunch options.",
  },
  {
    id: 14,
    name: "Shoe Lane Coffee",
    area: "Tara Street",
    address: "7 Tara Street, Dublin 2",
    coords: [53.3467, -6.2558],
    description:
      "Charming cafe with old-world decor featuring a vintage bicycle. A great pitstop near the Dart station.",
  },
  {
    id: 15,
    name: "Beanhive",
    area: "Dawson Street",
    address: "26 Dawson Street, Dublin 2",
    coords: [53.3398, -6.2588],
    description:
      "Famous for their incredibly cute latte art (think hedgehogs and bears) and cozy, friendly service.",
  },
];

export default function App() {
  const mapRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelect = (id) => {
    setActiveId(id);
    mapRef.current?.flyToAndOpen(id);
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  return (
    <>
      <header>
        <h1>
          <i className="fas fa-mug-hot"></i> Dublin Coffee Map
        </h1>
        <button
          className="mobile-toggle"
          onClick={() => setSidebarOpen((s) => !s)}
          aria-label="Toggle sidebar"
        >
          <i className="fas fa-bars"></i>
        </button>
      </header>

      <div className="main-container">
        <div
          className={`overlay ${sidebarOpen ? "active" : ""}`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <h2>Curated Selection</h2>
            <p>
              A guide to the finest specialty coffee shops across Dublin City,
              from historic cafes to modern micro-roasters.
            </p>
          </div>
          <ul className="shop-list">
            {coffeeShops.map((shop) => (
              <li
                key={shop.id}
                className={`shop-item ${activeId === shop.id ? "active" : ""}`}
                onClick={() => handleSelect(shop.id)}
              >
                <div className="shop-name">{shop.name}</div>
                <div className="shop-area">{shop.area}</div>
                <div className="shop-desc">{shop.description}</div>
              </li>
            ))}
          </ul>
        </aside>

        <MapView ref={mapRef} shops={coffeeShops} onSelect={setActiveId} />
      </div>
    </>
  );
}
