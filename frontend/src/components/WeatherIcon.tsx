import {
  faCloud,
  faCloudBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudShowersWater,
  faCloudSun,
  faCloudSunRain,
  faSmog,
  faSnowflake,
  faSun,
  faTemperatureThreeQuarters,
  faUmbrella,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const WeatherIcon = (weatherCode: number) => {
  switch (weatherCode) {
    case 0:
      return (
        <FontAwesomeIcon icon={faSun} size="4x" style={{ color: "#3e5160" }} />
      );
    case 1:
      return (
        <FontAwesomeIcon
          icon={faCloudSun}
          size="4x"
          style={{ color: "#3e5160" }}
        />
      );
    case 2:
    case 3:
      return (
        <FontAwesomeIcon
          icon={faCloud}
          size="4x"
          style={{ color: "#3e5160" }}
        />
      );
    case 45:
    case 48:
      return (
        <FontAwesomeIcon icon={faSmog} size="4x" style={{ color: "#3e5160" }} />
      );
    case 51:
    case 53:
    case 55:
      return (
        <FontAwesomeIcon
          icon={faUmbrella}
          size="4x"
          style={{ color: "#3e5160" }}
        />
      );
    case 56:
    case 57:
      return (
        <FontAwesomeIcon
          icon={faCloudSunRain}
          size="4x"
          style={{ color: "#3e5160" }}
        />
      );
    case 61:
    case 80:
      return (
        <FontAwesomeIcon
          icon={faCloudRain}
          size="4x"
          style={{ color: "#3e5160" }}
        />
      );
    case 63:
    case 66:
    case 81:
      return (
        <FontAwesomeIcon
          icon={faCloudShowersHeavy}
          size="4x"
          style={{ color: "#3e5160" }}
        />
      );
    case 65:
    case 67:
    case 82:
      return (
        <FontAwesomeIcon
          icon={faCloudShowersWater}
          size="4x"
          style={{ color: "#3e5160" }}
        />
      );
    case 71:
    case 85:
    case 73:
    case 75:
    case 77:
    case 86:
      return (
        <FontAwesomeIcon
          icon={faSnowflake}
          size="4x"
          style={{ color: "#3e5160" }}
        />
      );
    case 95:
    case 96:
    case 99:
      return (
        <FontAwesomeIcon
          icon={faCloudBolt}
          size="4x"
          style={{ color: "#3e5160" }}
        />
      );
    default:
      return (
        <FontAwesomeIcon
          icon={faTemperatureThreeQuarters}
          size="4x"
          style={{ color: "#3e5160" }}
        />
      );
  }
};
