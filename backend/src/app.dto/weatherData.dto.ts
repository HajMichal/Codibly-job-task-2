import { IsNotEmpty, isArray } from 'class-validator';

export class WeatherDataDto {
  @IsNotEmpty()
  time: string[];

  @IsNotEmpty()
  weather_code: number[];

  @IsNotEmpty()
  temperature_2m_min: number[];

  @IsNotEmpty()
  temperature_2m_max: number[];

  @IsNotEmpty()
  sunshine_duration: number[];
}

export class WeatherApiResponseDto {
  data: {
    daily: WeatherDataDto;
  };
}
