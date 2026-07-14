import { useEffect, useRef } from "preact/hooks";
import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import {useFlightInfo} from "../../providers/FlightInfoProvider.tsx";

export function MapTrack() {
  const { realTime } = useFlightInfo();
  const latLon = realTime.latLon
  const points = latLon.map((p) => new LatLng(p.lat, p.lon));
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || points.length === 0) return;

    // 1. Initialize the map instance if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current);

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;

    // 2. Create the polyline (2px wide, red)
    const polyline = L.polyline(points, {
      color: "red",
      weight: 2,
    }).addTo(map);

    // 3. Automatically calculate bounding box and adjust zoom
    const bounds = polyline.getBounds();
    map.fitBounds(bounds, { padding: [20, 20] }); // Optional padding around the lines

    // Cleanup map elements on unmount or when points change
    return () => {
      polyline.remove();
    };
  }, [points]);

  // Clean up the entire map instance on component unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div class="h-[70%] w-full rounded-none overflow-y-auto relative">
      <div class="h-full w-full map" ref={mapContainerRef} />
    </div>
  )
}

export default MapTrack;
