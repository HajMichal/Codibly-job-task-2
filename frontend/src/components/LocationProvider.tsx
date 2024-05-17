import { ReactNode, useState } from "react";
import { LocationContext } from "../context/LocationContext";

export const LocationProvider = ({children}: {children: ReactNode}) => {
  const [geoLocation, setGeoLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 52.229, lng: 21.011 });

  return (
    <LocationContext.Provider value={{ geoLocation, setGeoLocation }}>
      {children}
    </LocationContext.Provider>
    )
}