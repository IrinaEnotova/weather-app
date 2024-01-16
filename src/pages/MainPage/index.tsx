import useForecast from 'hooks/useForecast';

import ForecastBlock from 'components/Forecast';
import Search from 'components/Search';
import UserGeoBlock from 'components/UserGeoBlock';

import styles from './MainPage.module.css';

export default function MainPage() {
  const {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onCitySubmit,
  } = useForecast();

  return (
    <>
      {forecast ? (
        <div className={styles.content}>
          <div className={styles.currentData}>
            <ForecastBlock forecast={forecast} />
            <UserGeoBlock />
          </div>
          <div>Carousel</div>
        </div>
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onCitySubmit={onCitySubmit}
        />
      )}
    </>
  );
}
