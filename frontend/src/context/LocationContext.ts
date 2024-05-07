import { createContext } from "react";

export interface LatLngType {
  lat: number;
  lng: number;
}
export interface LocationContextType {
  geoLocation: LatLngType;
  setGeoLocation: (geoLocation: LatLngType) => void;
}
export const LocationContext = createContext<LocationContextType>({
  geoLocation: { lat: 52.229, lng: 21.011 },
  setGeoLocation: () => {},
});
