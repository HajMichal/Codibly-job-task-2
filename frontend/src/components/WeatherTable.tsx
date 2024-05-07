import { useContext, useEffect, useState } from "react";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import { getWeather, GetWeatherResponse } from "../fetchData/getWeather";
import { formatDate } from "../helpers/formatDate";
import { WeatherIcon } from "./WeatherIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSolarPanel,
  faTemperatureArrowDown,
  faTemperatureArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { LocationContext } from "../context/LocationContext";

function WeatherTable() {
  const scrollRef = useHorizontalScroll();
  const { geoLocation } = useContext(LocationContext);

  const [weatherData, setWeatherData] = useState<GetWeatherResponse[] | null>(
    null
  );

  useEffect(() => {
    const getWeatherData = async () => {
      return await getWeather({
        lat: geoLocation.lat,
        lng: geoLocation.lng,
      });
    };
    getWeatherData().then((response) => {
      setWeatherData(response.data);
    });
  }, [geoLocation]);

  return (
    <div
      ref={scrollRef}
      className="w-[90vw] h-96 bg-white bg-opacity-45 rounded-md flex overflow-x-auto tablet:justify-around snap-mandatory snap-x scroll-smooth"
    >
      {weatherData?.map((dailyWeather, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-around min-w-28"
        >
          <p>{formatDate(dailyWeather.date)}</p>
          <p>{WeatherIcon(dailyWeather.weatherCode)}</p>
          <p>
            <FontAwesomeIcon icon={faTemperatureArrowUp} size="xl" />{" "}
            {dailyWeather.temperature.max}°C
          </p>
          <p>
            <FontAwesomeIcon icon={faTemperatureArrowDown} size="xl" />{" "}
            {dailyWeather.temperature.min}°C
          </p>
          <div className="flex flex-col items-center">
            <div>
              <FontAwesomeIcon icon={faSolarPanel} size="xl" />{" "}
              <span className="text-2xl font-semibold">
                {dailyWeather.estimatedEnergyGenerated}
              </span>{" "}
            </div>
            <p>kWh</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default WeatherTable;
