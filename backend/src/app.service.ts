import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { weatherDataMapper } from './common/mappers/weatherDataMapper';
import { GetWeatherWithEnergyDto, WeatherApiResponseDto } from './app.dto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getWeatherWithEnergy(query: GetWeatherWithEnergyDto) {
    return this.getWeather(query).pipe(
      map((response: WeatherApiResponseDto) => {
        return this.loopThroughWeatherData(response);
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

  getWeather({ lat, lng }: GetWeatherWithEnergyDto) {
    return this.baseHttpService(
      `forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunshine_duration&timezone=auto`,
    );
  }

  private loopThroughWeatherData(response: WeatherApiResponseDto) {
    const dataToReturn = [];
    const weather = response.data.daily;

    for (let i = 0; i < weather.time.length; i++) {
      dataToReturn.push(weatherDataMapper(weather, i));
    }

    return dataToReturn;
  }
  private baseHttpService(queryParamsUrl: string) {
    try {
      return this.httpService.get(
        `https://api.open-meteo.com/v1/${queryParamsUrl}`,
      );
    } catch (error) {
      throw error;
    }
  }
}
