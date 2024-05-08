import { Test } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { GetWeatherWithEnergyDto } from 'src/app.dto/getWeatherWIthEnergy.dto';
import { of } from 'rxjs';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

const mockedCorrectResponse = [
  {
    date: '2024-05-07',
    weatherCode: 80,
    temperature: {
      min: 11.2,
      max: 15.5,
    },
    estimatedEnergyGenerated: '0.21',
  },
  {
    date: '2024-05-08',
    weatherCode: 3,
    temperature: {
      min: 7.9,
      max: 15.9,
    },
    estimatedEnergyGenerated: '6.59',
  },
  {
    date: '2024-05-09',
    weatherCode: 3,
    temperature: {
      min: 6.6,
      max: 17.7,
    },
    estimatedEnergyGenerated: '6.80',
  },
  {
    date: '2024-05-10',
    weatherCode: 3,
    temperature: {
      min: 6.9,
      max: 18,
    },
    estimatedEnergyGenerated: '5.86',
  },
  {
    date: '2024-05-11',
    weatherCode: 61,
    temperature: {
      min: 9.6,
      max: 14.4,
    },
    estimatedEnergyGenerated: '0.02',
  },
  {
    date: '2024-05-12',
    weatherCode: 61,
    temperature: {
      min: 11.2,
      max: 17.2,
    },
    estimatedEnergyGenerated: '5.06',
  },
  {
    date: '2024-05-13',
    weatherCode: 3,
    temperature: {
      min: 7.5,
      max: 17.7,
    },
    estimatedEnergyGenerated: '7.08',
  },
];

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getWeatherWithEnergy', () => {
    it('should return weather forecast for next 7 days in json format', async () => {
      const query: GetWeatherWithEnergyDto = {
        lat: 49.8,
        lng: 19.09,
      };
      jest
        .spyOn(appService, 'getWeatherWithEnergy')
        .mockReturnValue(of(mockedCorrectResponse));

      appController.getWeatherWithEnergy(query).subscribe((result) => {
        expect(result).toEqual(mockedCorrectResponse);
      });
    });
  });
});
