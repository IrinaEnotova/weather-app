import { useEffect } from 'react';
import { useAppSelector } from 'src/store';

import useForecast from 'hooks/useForecast';

import CurrentForecast from 'components/CurrentForecast';
import Loader from 'components/Loader';
import Overlay from 'components/Overlay';
import Search from 'components/Search';
import Slider from 'components/Slider';
import UserGeoBlock from 'components/UserGeoBlock';

import styles from './MainPage.module.css';

export default function MainPage() {
  const { term, clearTerm, onInputChange, onOptionSelect, onCitySubmit } =
    useForecast();
  const { city, forecast, currentForecast, isError, isLoading } =
    useAppSelector((state) => state.forecastReducer);

  useEffect(() => {
    if (city) onCitySubmit();
  }, []);

  if (isError) {
    return (
      <Overlay>
        <h2 className={styles.errorMessage}>
          Что-то пошло не так...
          <br />
          Попробуйте позже
        </h2>
      </Overlay>
    );
  }

  if (
    forecast &&
    currentForecast &&
    (city?.local_names.ru === currentForecast?.name ||
      city?.local_names.en === currentForecast?.name)
  ) {
    return (
      <div className={styles.content}>
        <div className={styles.currentData}>
          <CurrentForecast />
          <UserGeoBlock clearTerm={clearTerm} />
        </div>
        <Slider />
      </div>
    );
  }

  return (
    <>
      <Search
        term={term}
        // options={options}
        onInputChange={onInputChange}
        onOptionSelect={onOptionSelect}
        onCitySubmit={onCitySubmit}
      />
      {isLoading && (
        <Overlay>
          <Loader />
        </Overlay>
      )}
    </>
  );
}
