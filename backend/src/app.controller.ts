import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { GetWeatherWithEnergyDto } from './app.dto/getWeatherWIthEnergy.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWeatherWithEnergy(
    @Query(new ValidationPipe({ transform: true }))
    query: GetWeatherWithEnergyDto,
  ) {
    return this.appService.getWeatherWithEnergy(query);
  }
}
