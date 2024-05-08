import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class GetWeatherWithEnergyDto {
  @IsNotEmpty()
  @IsLongitude()
  lng: number;

  @IsNotEmpty()
  @IsLatitude()
  lat: number;
}
