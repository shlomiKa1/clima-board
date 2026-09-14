export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  weather_code: string;
  wind_speed_10m: string;
  apparent_temperature: string;
}

export interface CurrentData {
  time: string;
  interval: number;
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  apparent_temperature: number;
}

export interface CurrentWeatherResponse {
  latitude: number;
  longitude: number;
  current_units: CurrentUnits;
  current: CurrentData;
}
