import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  CityOption,
  CurrentForecast,
  Forecast,
} from 'interfaces/API.interfaces';

type InitialStateType = {
  city: CityOption | null;
  options: CityOption[] | null;
  forecast: Forecast | null;
  currentForecast: CurrentForecast | null;
  isError: boolean;
  isLoading: boolean;
};

const initialCity = localStorage.getItem('city') || '';
const initialState: InitialStateType = {
  city: initialCity ? JSON.parse(initialCity) : null,
  options: null,
  forecast: null,
  currentForecast: null,
  isError: false,
  isLoading: false,
};

export const forecastSlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<CityOption | null>) {
      state.city = action.payload;
    },
    setOptions(state, action: PayloadAction<CityOption[] | null>) {
      state.options = action.payload;
    },
    setForecast(state, action: PayloadAction<Forecast | null>) {
      state.forecast = action.payload;
    },
    setCurrentForecast(state, action: PayloadAction<CurrentForecast | null>) {
      state.currentForecast = action.payload;
    },
    setIsError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export default forecastSlice.reducer;
export const {
  setCity,
  setOptions,
  setForecast,
  setCurrentForecast,
  setIsError,
  setIsLoading,
} = forecastSlice.actions;
