import { ChangeEvent, useEffect, useState } from 'react';

import {
  CityOption,
  CurrentForecast,
  Forecast,
  StepForecast,
} from 'interfaces/API.interfaces';

import { API_KEY, API_LANGUAGE, CITY_LIMIT } from 'utils/constants';

export default function useForecast() {
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<CityOption[] | null>(null);
  const [city, setCity] = useState<CityOption | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [currentForecast, setCurrentForecast] =
    useState<CurrentForecast | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSearchOptions = (value: string) => {
    const formattedTerm = value.trim();
    setIsError(false);
    setIsLoading(true);
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${formattedTerm}&limit=${CITY_LIMIT}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((err): void => {
        if (err instanceof Error) {
          setIsError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    setIsError(false);
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&lang=${API_LANGUAGE}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.filter((item: StepForecast, idx: number) => {
            if (idx === 0 || idx % 2 === 0) return item;
          }),
        };
        setForecast(forecastData);
      })
      .catch((err): void => {
        if (err instanceof Error) {
          setIsError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getCurrentForecast = (city: CityOption) => {
    setIsError(false);
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&lang=${API_LANGUAGE}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentForecast(data);
      })
      .catch((err): void => {
        if (err instanceof Error) {
          setIsError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onCitySubmit = () => {
    if (city) {
      getForecast(city);
      getCurrentForecast(city);
    }
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
    currentForecast,
    isError,
    isLoading,
    onInputChange,
    onOptionSelect,
    onCitySubmit,
  };
}
