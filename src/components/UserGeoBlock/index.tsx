import { BtnAppearance, BtnSize } from 'enums/Btn.enums';

import useDate from 'hooks/useDate';

import Button from 'components/Button';

import styles from './UserGeoBlock.module.css';

export default function UserGeoBlock() {
  const { position, date, message } = useDate();

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
          <p>Самара</p>
          <Button appearance={BtnAppearance.Separate} size={BtnSize.Medium}>
            Изменить
          </Button>
        </div>
      </div>
    </>
  );
}
