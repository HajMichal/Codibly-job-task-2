import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

function Header() {
  const { geoLocation } = useContext(LocationContext);
  return (
    <div className="w-full h-16 flex-wrap items-center justify-center gap-5 text-2xl font-semibold text-gray-800 hidden tablet:flex">
      <div>
        <span className="text-4xl">Lat:</span> {geoLocation.lat}
      </div>
      <div>
        <span className="text-4xl">Lon:</span> {geoLocation.lng}
      </div>
    </div>
  );
}
export default Header;
