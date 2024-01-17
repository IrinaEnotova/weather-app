import { useEffect, useState } from 'react';
import { GeoPosition } from 'src/interfaces/API.interfaces';

export default function useDate() {
  const [position, setPosition] = useState<GeoPosition>({
    latitude: null,
    longitude: null,
  });
  const [message, setMessage] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [day, setDay] = useState<number>(0);

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
    const timerId = setInterval(() => {
      const date = new Date();
      setDate(date);
      setDay(date.getDay());
    }, 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  });

  return { position, date, day, message };
}
