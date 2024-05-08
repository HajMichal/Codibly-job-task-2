import { HttpException, Injectable } from '@nestjs/common';
import { GetWeatherWithEnergyDto } from './app.dto/getWeatherWIthEnergy.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';

const INSTALLATION_POWER = 2.5;
const PANEL_EFFECTIVENESS = 0.2;

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getWeatherWithEnergy(query: GetWeatherWithEnergyDto) {
    return this.getWeather(query).pipe(
      map((response) => {
        const dataToReturn = [];
        const weather = response.data.daily;

        for (let i = 0; i < weather.time.length; i++) {
          // Sun exposition duration in hours
          const expositionDuration = weather.sunshine_duration[i] / 60 / 60;

          // moc instalacji[kW] x czas ekspozycji[h] x efektywność paneli
          const estimatedEnergyGenerated = (
            INSTALLATION_POWER *
            expositionDuration *
            PANEL_EFFECTIVENESS
          ).toFixed(2);

          dataToReturn.push({
            date: weather.time[i],
            weatherCode: weather.weather_code[i],
            temperature: {
              min: weather.temperature_2m_min[i],
              max: weather.temperature_2m_max[i],
            },
            estimatedEnergyGenerated,
          });
        }

        return dataToReturn;
      }),
      catchError(({ response }) => {
        throw new HttpException(
          {
            error: response.data.reason,
            status: response.status,
          },
          response.status,
        );
      }),
    );
  }

  getWeather(query: GetWeatherWithEnergyDto) {
    try {
      return this.httpService.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${query.lat}&longitude=${query.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunshine_duration&timezone=auto`,
      );
    } catch (error) {
      throw error;
    }
  }
}
