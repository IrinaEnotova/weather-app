import { useEffect, useState } from 'react';

import styles from './UserGeoBlock.module.css';
import Button from '../components/Button';
import { BtnAppearance, BtnSize } from '../enums/Btn.enums';

export default function UserGeoBlock() {
  const [position, setPosition] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [message, setMessage] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      setMessage('Геолокация не доступна в вашем браузере');
    }
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  });

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
