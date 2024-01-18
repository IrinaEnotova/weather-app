import { useContext, useEffect } from 'react';

import { CityContext } from 'context/CityContext';

import useForecast from 'hooks/useForecast';

import CurrentForecast from 'components/CurrentForecast';
import Loader from 'components/Loader';
import Overlay from 'components/Overlay';
import Search from 'components/Search';
import Slider from 'components/Slider';
import UserGeoBlock from 'components/UserGeoBlock';

import styles from './MainPage.module.css';

export default function MainPage() {
  const {
    term,
    options,
    forecast,
    currentForecast,
    isError,
    isLoading,
    clearTerm,
    onInputChange,
    onOptionSelect,
    onCitySubmit,
  } = useForecast();
  const { city } = useContext(CityContext);

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
          <CurrentForecast currentForecast={currentForecast} />
          <UserGeoBlock clearTerm={clearTerm} />
        </div>
        <Slider forecast={forecast} />
      </div>
    );
  }

  return (
    <>
      <Search
        term={term}
        options={options}
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
