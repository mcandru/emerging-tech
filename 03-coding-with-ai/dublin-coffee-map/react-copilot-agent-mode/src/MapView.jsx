import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import L from "leaflet";

const MapView = forwardRef(function MapView({ shops, onSelect }, ref) {
  const mapElRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map(mapElRef.current, { zoomControl: false }).setView(
      [53.345, -6.2603],
      14,
    );

    L.control.zoom({ position: "topright" }).addTo(map);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      },
    ).addTo(map);

    const createCustomIcon = () =>
      L.divIcon({
        className: "custom-icon",
        html: '<div class="marker-pin"><i class="fas fa-coffee"></i></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -45],
      });

    shops.forEach((shop) => {
      const marker = L.marker(shop.coords, { icon: createCustomIcon() }).addTo(
        map,
      );

      const popupContent = `
        <div class="popup-header">${shop.name}</div>
        <div class="popup-body">
          <strong>${shop.area}</strong><br />
          ${shop.description}
          <div class="popup-address">
            <i class="fas fa-map-marker-alt"></i> ${shop.address}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on("click", () => onSelect?.(shop.id));

      markersRef.current[shop.id] = marker;
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, [shops, onSelect]);

  useImperativeHandle(
    ref,
    () => ({
      flyToAndOpen(id) {
        const shop = shops.find((s) => s.id === id);
        if (!shop || !mapRef.current) return;
        mapRef.current.flyTo(shop.coords, 16, { animate: true, duration: 1.5 });
        const marker = markersRef.current[id];
        if (marker) marker.openPopup();
      },
    }),
    [shops],
  );

  return <div id="map" ref={mapElRef}></div>;
});

export default MapView;
