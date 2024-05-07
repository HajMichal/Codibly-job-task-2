import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { memo, useContext } from "react";
import { LocationContext } from "../../context/LocationContext";
import LocationMarker from "./LocationMarker";

const Map = memo(function Map() {
  const { geoLocation } = useContext(LocationContext);
  return (
    <div className="w-[90vw] h-[40%] rounded-md">
      <MapContainer
        center={[geoLocation.lat, geoLocation.lng]}
        zoom={10}
        fadeAnimation
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
});
export default Map;
