import axiosBase from "./axiosBase";

interface GetWeatherProps {
  lat: number;
  lng: number;
}

export interface GetWeatherResponse {
  date: string;
  weatherCode: number;
  temperature: {
    min: number;
    max: number;
  };
  estimatedEnergyGenerated: string;
}

export const getWeather = async ({
  lat,
  lng,
}: GetWeatherProps): Promise<{ data: GetWeatherResponse[] }> => {
  return await axiosBase.get(`http://localhost:3000/?lat=${lat}&lng=${lng}`);
};
