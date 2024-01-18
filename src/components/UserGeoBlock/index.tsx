import { useAppDispatch, useAppSelector } from 'src/store';
import {
  setCity,
  setCurrentForecast,
  setForecast,
} from 'src/store/reducers/forecastSlice';

import { BtnAppearance, BtnSize } from 'enums/Btn.enums';

import useDate from 'hooks/useDate';

import Button from 'components/Button';

import styles from './UserGeoBlock.module.css';

type UserGeoBlockType = {
  clearTerm: () => void;
};

export default function UserGeoBlock({ clearTerm }: UserGeoBlockType) {
  const { position, date, message } = useDate();
  const { city } = useAppSelector((state) => state.forecastReducer);
  const dispatch = useAppDispatch();

  const changeCityForecast = () => {
    dispatch(setCity(null));
    dispatch(setForecast(null));
    dispatch(setCurrentForecast(null));
    clearTerm();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h4>Мое местоположение</h4>
        {position.latitude && position.longitude ? (
          <>
            <p>
              {position.latitude} {position.longitude}
            </p>
            <p>Сегодня {date?.toLocaleDateString()}</p>
            <h2>{date?.toLocaleTimeString()}</h2>
          </>
        ) : (
          <p>Ожидание...</p>
        )}
        <p>{message}</p>
        <h4>Прогноз погоды</h4>
        <div className={styles.cityWrapper}>
          <p>{city?.local_names.ru}</p>
          <Button
            appearance={BtnAppearance.Separate}
            size={BtnSize.Medium}
            onClick={changeCityForecast}
          >
            Изменить
          </Button>
        </div>
      </div>
    </>
  );
}
