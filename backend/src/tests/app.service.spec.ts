import { Test } from '@nestjs/testing';
import { AppService } from '../app.service';
import { HttpService } from '@nestjs/axios';
import { catchError, EMPTY, of } from 'rxjs';
import { GetWeatherWithEnergyDto } from 'src/app.dto/getWeatherWIthEnergy.dto';
import { AxiosResponse } from 'axios';

describe('AppService Test suite', () => {
  let appService: AppService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  const mockQuery: GetWeatherWithEnergyDto = {
    lat: 49.0625,
    lng: 19.0,
  };
  const mockResponseWeatherData = {
    latitude: 49.0625,
    longitude: 19.0,
    generationtime_ms: 0.07903575897216797,
    utc_offset_seconds: 7200,
    timezone: 'Europe/Bratislava',
    timezone_abbreviation: 'CEST',
    elevation: 526.0,
    daily_units: {
      time: 'iso8601',
      weather_code: 'wmo code',
      temperature_2m_max: '°C',
      temperature_2m_min: '°C',
      sunshine_duration: 's',
    },
    daily: {
      time: [
        '2024-05-08',
        '2024-05-09',
        '2024-05-10',
        '2024-05-11',
        '2024-05-12',
        '2024-05-13',
        '2024-05-14',
      ],
      weather_code: [61, 3, 45, 3, 61, 45, 2],
      temperature_2m_max: [16.6, 18.0, 18.2, 17.4, 16.6, 19.6, 21.0],
      temperature_2m_min: [9.2, 6.4, 3.7, 4.1, 6.7, 4.5, 8.1],
      sunshine_duration: [
        39600.0, 49083.3, 41039.26, 34695.73, 49743.65, 50843.98, 50849.53,
      ],
    },
  };

  const mockResponse: AxiosResponse<any> = {
    data: mockResponseWeatherData,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {
      headers: undefined,
    },
  };

  describe('getWeather', () => {
    it('should return data correctly', async () => {
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      const result = await appService.getWeather(mockQuery);

      expect(httpService.get).toHaveBeenCalledWith(
        `https://api.open-meteo.com/v1/forecast?latitude=${mockQuery.lat}&longitude=${mockQuery.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunshine_duration&timezone=auto`,
      );
      result.subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });
    });
  });

  describe('getWeatherWithEnergy', () => {
    const mockPreparedData = [
      {
        date: '2024-05-08',
        estimatedEnergyGenerated: '5.50',
        temperature: { max: 16.6, min: 9.2 },
        weatherCode: 61,
      },
      {
        date: '2024-05-09',
        estimatedEnergyGenerated: '6.82',
        temperature: { max: 18, min: 6.4 },
        weatherCode: 3,
      },
      {
        date: '2024-05-10',
        estimatedEnergyGenerated: '5.70',
        temperature: { max: 18.2, min: 3.7 },
        weatherCode: 45,
      },
      {
        date: '2024-05-11',
        estimatedEnergyGenerated: '4.82',
        temperature: { max: 17.4, min: 4.1 },
        weatherCode: 3,
      },
      {
        date: '2024-05-12',
        estimatedEnergyGenerated: '6.91',
        temperature: { max: 16.6, min: 6.7 },
        weatherCode: 61,
      },
      {
        date: '2024-05-13',
        estimatedEnergyGenerated: '7.06',
        temperature: { max: 19.6, min: 4.5 },
        weatherCode: 45,
      },
      {
        date: '2024-05-14',
        estimatedEnergyGenerated: '7.06',
        temperature: { max: 21, min: 8.1 },
        weatherCode: 2,
      },
    ];

    it('should return a data in correct format', async () => {
      jest
        .spyOn(appService, 'getWeather')
        .mockReturnValueOnce(of(mockResponse));

      const result = await appService.getWeatherWithEnergy(mockQuery);

      result.subscribe((res) => {
        expect(res).toEqual(mockPreparedData);
      });
    });

    it('should throw an HttpException', async () => {
      const mockErrorResponse = {
        response: {
          data: {
            reason: 'Error reason',
          },
          status: 400,
        },
      };

      jest.spyOn(appService, 'getWeather').mockReturnValue(EMPTY);

      const result = appService.getWeatherWithEnergy(mockQuery);

      result.pipe(
        catchError(async (err) => expect(err).toBe(mockErrorResponse)),
      );
    });
  });
});
