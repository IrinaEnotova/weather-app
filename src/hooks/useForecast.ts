import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  setCity,
  setCurrentForecast,
  setForecast,
  setIsError,
  setIsLoading,
  setOptions,
} from 'src/store/reducers/forecastSlice';

import { CityOption, StepForecast } from 'interfaces/API.interfaces';

import {
  API_KEY,
  API_LANGUAGE,
  CITY_CURRENT_URL,
  CITY_LIMIT,
  CITY_OPTIONS_URL,
  FORECAST_URL,
} from 'utils/constants';

export default function useForecast() {
  const [term, setTerm] = useState<string>('');
  const dispatch = useAppDispatch();
  const { city } = useAppSelector((state) => state.forecastReducer);

  const getSearchOptions = (value: string) => {
    const formattedTerm = value.trim();
    dispatch(setIsError(false));
    fetch(
      `${CITY_OPTIONS_URL}?q=${formattedTerm}&limit=${CITY_LIMIT}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => dispatch(setOptions(data)))
      .catch((err): void => {
        if (err instanceof Error) {
          dispatch(setIsError(true));
        }
      });
  };

  const clearTerm = () => {
    setTerm('');
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setTerm(value);

    if (!value) {
      dispatch(setOptions(null));
      return;
    }

    getSearchOptions(value);
  };

  const getForecast = (city: CityOption) => {
    dispatch(setIsError(false));
    dispatch(setIsLoading(true));
    fetch(
      `${CITY_CURRENT_URL}?lat=${city.lat}&lon=${city.lon}&units=metric&lang=${API_LANGUAGE}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.filter((item: StepForecast, idx: number) => {
            if (idx === 0 || idx % 2 === 0) return item;
          }),
        };
        dispatch(setForecast(forecastData));
      })
      .catch((err): void => {
        if (err instanceof Error) {
          dispatch(setIsError(true));
        }
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };

  const getCurrentForecast = (city: CityOption) => {
    dispatch(setIsError(false));
    dispatch(setIsLoading(true));
    fetch(
      `${FORECAST_URL}?lat=${city.lat}&lon=${city.lon}&units=metric&lang=${API_LANGUAGE}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCurrentForecast(data));
      })
      .catch((err): void => {
        if (err instanceof Error) {
          dispatch(setIsError(true));
        }
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };

  const onCitySubmit = () => {
    if (city) {
      getForecast(city);
      getCurrentForecast(city);
    }
  };

  const onOptionSelect = (option: CityOption) => {
    dispatch(setCity(option));
    localStorage.setItem('city', JSON.stringify(option));
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      dispatch(setOptions(null));
    }
  }, [city]);

  return {
    term,
    clearTerm,
    onInputChange,
    onOptionSelect,
    onCitySubmit,
  };
}
