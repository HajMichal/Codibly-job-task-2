import WeatherTable from "./components/WeatherTable";
import Map from "./components/Map/Map";
import Header from "./components/Header";
import { LocationProvider } from "./components/LocationProvider";

function App() {
  return (
    <div className="bg-gradient-to-r from-[#07b6d4] to-[#3b82f6] w-screen h-screen flex flex-col justify-center items-center gap-5">
      <LocationProvider>
        <Header />
        <WeatherTable />
        <Map />
      </LocationProvider>
    </div>
  );
}

export default App;
