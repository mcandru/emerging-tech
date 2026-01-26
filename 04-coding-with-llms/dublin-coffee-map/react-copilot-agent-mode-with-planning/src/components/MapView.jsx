import { useMemo, useRef, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Coffee, MapPin } from "lucide-react";
import L from "leaflet";

const tileUrl =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
const tileAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const createCoffeeIcon = () => {
  const html = renderToStaticMarkup(
    <div className="marker-pin">
      <Coffee size={18} strokeWidth={2.2} aria-hidden="true" />
    </div>,
  );

  return L.divIcon({
    className: "custom-icon",
    html,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -45],
  });
};

function ActiveShopHandler({ activeShop, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    if (!activeShop) {
      return;
    }

    map.flyTo(activeShop.coords, 16, {
      animate: true,
      duration: 1.5,
    });

    const marker = markerRefs.current.get(activeShop.id);
    if (marker) {
      marker.openPopup();
    }
  }, [activeShop, map, markerRefs]);

  return null;
}

export default function MapView({ shops, activeShopId }) {
  const markerRefs = useRef(new Map());
  const coffeeIcon = useMemo(() => createCoffeeIcon(), []);
  const activeShop = shops.find((shop) => shop.id === activeShopId) || null;

  const handleMarkerRef = (shopId) => (marker) => {
    if (marker) {
      markerRefs.current.set(shopId, marker);
    } else {
      markerRefs.current.delete(shopId);
    }
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[53.345, -6.2603]}
        zoom={14}
        zoomControl={false}
        className="h-full w-full"
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution={tileAttribution}
          url={tileUrl}
          subdomains="abcd"
          maxZoom={20}
        />
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            position={shop.coords}
            icon={coffeeIcon}
            ref={handleMarkerRef(shop.id)}
          >
            <Popup>
              <div className="popup-header font-display">{shop.name}</div>
              <div className="popup-body">
                <strong>{shop.area}</strong>
                <div className="mt-1 text-sm text-[#333]">
                  {shop.description}
                </div>
                <div className="popup-address mt-2 flex items-start gap-2 text-sm italic text-[#666]">
                  <MapPin className="mt-0.5 h-4 w-4" aria-hidden="true" />
                  <span>{shop.address}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <ActiveShopHandler activeShop={activeShop} markerRefs={markerRefs} />
      </MapContainer>
    </div>
  );
}
