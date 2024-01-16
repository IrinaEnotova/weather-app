import { useEffect, useState } from 'react';

export default function useDate() {
  const [position, setPosition] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [message, setMessage] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
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
