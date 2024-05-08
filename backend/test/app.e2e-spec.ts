import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';
import { GetWeatherWithEnergyDto } from '../src/app.dto/getWeatherWIthEnergy.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const appService = {
    getWeatherWithEnergy: () => [
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
    ],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET - should return correct response', () => {
    const query: GetWeatherWithEnergyDto = {
      lat: 49.8,
      lng: 19.09,
    };
    return request(app.getHttpServer())
      .get('/')
      .query(query)
      .expect(200)
      .expect(appService.getWeatherWithEnergy());
  });

  // it should work because I have been set nestjs validation pipe with transform true
  it('/GET - should return correct response despite of query values are strings', () => {
    const query = {
      lat: '49.8',
      lng: '19.09',
    };
    return request(app.getHttpServer())
      .get('/')
      .query(query)
      .expect(200)
      .expect(appService.getWeatherWithEnergy());
  });

  it('/GET - should return an error due to bad query format', () => {
    const query: GetWeatherWithEnergyDto = {
      lat: 499.8,
      lng: 19.09,
    };
    return request(app.getHttpServer())
      .get('/')
      .query(query)
      .expect(400)
      .expect({
        message: ['lat must be a latitude string or number'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it('/GET - should return an error due to no provided query format', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(400)
      .expect({
        message: [
          'lng must be a longitude string or number',
          'lng should not be empty',
          'lat must be a latitude string or number',
          'lat should not be empty',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
  });
});
