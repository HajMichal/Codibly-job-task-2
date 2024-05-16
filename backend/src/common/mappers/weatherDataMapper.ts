import { WeatherDataDto } from 'src/app.dto';
import {
  INSTALLATION_POWER,
  PANEL_EFFECTIVENESS,
} from '../constans/dataToFormula';

export const weatherDataMapper = (weather: WeatherDataDto, index: number) => {
  // Sun exposition duration in hours
  const expositionDuration = weather.sunshine_duration[index] / 60 / 60;

  // moc instalacji[kW] x czas ekspozycji[h] x efektywność paneli
  const estimatedEnergyGenerated = (
    INSTALLATION_POWER *
    expositionDuration *
    PANEL_EFFECTIVENESS
  ).toFixed(2);

  return {
    date: weather.time[index],
    weatherCode: weather.weather_code[index],
    temperature: {
      min: weather.temperature_2m_min[index],
      max: weather.temperature_2m_max[index],
    },
    estimatedEnergyGenerated,
  };
};
