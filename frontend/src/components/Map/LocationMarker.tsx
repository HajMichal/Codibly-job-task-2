import { useContext, useEffect } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { LocationContext } from "../../context/LocationContext";

function LocationMarker() {
  const { geoLocation, setGeoLocation } = useContext(LocationContext);

  const map = useMapEvents({
    click(e) {
      setGeoLocation(e.latlng);
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
      setGeoLocation(e.latlng);
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  return geoLocation === null ? null : (
    <Marker position={geoLocation}>
      <Popup>Jesteś tutaj!</Popup>
    </Marker>
  );
}
export default LocationMarker;
