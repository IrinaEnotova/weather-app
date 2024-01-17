import useForecast from 'hooks/useForecast';

import CurrentForecast from 'components/CurrentForecast';
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
    onInputChange,
    onOptionSelect,
    onCitySubmit,
  } = useForecast();

  return (
    <>
      {forecast && currentForecast ? (
        <div className={styles.content}>
          <div className={styles.currentData}>
            <CurrentForecast currentForecast={currentForecast} />
            <UserGeoBlock />
          </div>
          <Slider forecast={forecast} />
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
