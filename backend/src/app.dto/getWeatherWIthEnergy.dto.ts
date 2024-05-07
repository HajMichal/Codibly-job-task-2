import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class GetWeatherWIthEnergyDto {
  @IsNotEmpty()
  @IsLongitude()
  lng: number;

  @IsNotEmpty()
  @IsLatitude()
  lat: number;
}
