import { useState } from "react";
import WeatherTable from "./components/WeatherTable";
import Map from "./components/Map/Map";
import { LocationContext } from "./context/LocationContext";
import Header from "./components/Header";

function App() {
  const [geoLocation, setGeoLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 52.229, lng: 21.011 });

  return (
    <div className="bg-gradient-to-r from-[#07b6d4] to-[#3b82f6] w-screen h-screen flex flex-col justify-center items-center gap-5">
      <LocationContext.Provider value={{ geoLocation, setGeoLocation }}>
        <Header />
        <WeatherTable />
        <Map />
      </LocationContext.Provider>
    </div>
  );
}

export default App;
