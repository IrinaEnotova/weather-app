import { ChangeEvent, useEffect, useState } from 'react';

import { CityOption, Forecast } from 'interfaces/API.interfaces';

import { API_KEY, API_LANGUAGE, CITY_LIMIT } from 'utils/constants';

export default function useForecast() {
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<CityOption[] | null>(null);
  const [city, setCity] = useState<CityOption | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);

  const getSearchOptions = (value: string) => {
    const formattedTerm = value.trim();
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${formattedTerm}&limit=${CITY_LIMIT}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setTerm(value);

    if (!value) {
      setOptions(null);
      return;
    }

    getSearchOptions(value);
  };

  const getForecast = (city: CityOption) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&lang=${API_LANGUAGE}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list,
        };
        setForecast(forecastData);
      });
  };

  const onCitySubmit = () => {
    if (city) getForecast(city);
  };

  const onOptionSelect = (option: CityOption) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions(null);
    }
  }, [city]);

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onCitySubmit,
  };
}
