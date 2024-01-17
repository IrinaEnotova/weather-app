export interface CityOption {
  name: string;
  lat: number;
  lon: number;
  country: string;
  local_names: object;
}

export interface StepForecast {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: { all: number };
  visibility: number;
  pop: number;
}

export interface Forecast {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
  list: StepForecast[];
}

export interface CurrentForecast {
  name: string;
  dt: number;
  timezone: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: { all: number };
  visibility: number;
  pop: number;
}

export interface GeoPosition {
  latitude: number | null;
  longitude: number | null;
}
