import { useAppSelector } from 'src/store';

import { CurrentForecast } from 'interfaces/API.interfaces';

import getDateByTimezone from 'utils/getDateByTimezone';
import getDateString from 'utils/getDateString';
import getIcon from 'utils/getIcon';
import getPressure from 'utils/getPressure';

import pressureIcon from 'assets/pressure.svg';
import temperatureIcon from 'assets/temperature.svg';
import windIcon from 'assets/wind.svg';

import styles from './CurrentForecast.module.css';

export default function CurrentForecast() {
  const { currentForecast } = useAppSelector((state) => state.forecastReducer);

  if (!currentForecast) {
    return (
      <div className={styles.wrapper}>
        <p>Что-то пошло не так...</p>
      </div>
    );
  }

  const date = getDateByTimezone(currentForecast);
  const currentIcon = getIcon(currentForecast.weather[0].icon);

  return (
    <div className={styles.wrapper}>
      <p>Сегодня {getDateString(date)}</p>
      <p>{currentForecast.weather[0].description}</p>
      <h1>
        {currentForecast.name}{' '}
        <span className={styles.icon}>{currentIcon}</span>
      </h1>
      <div className={styles.temperature}>
        <img src={temperatureIcon} alt="Temperature" width={30} />
        <div>
          <p>За окном {currentForecast.main.temp.toFixed()}&deg;C</p>
          <p>Ощущается как {currentForecast.main.feels_like.toFixed()}&deg;C</p>
        </div>
      </div>
      <div className={styles.pressure}>
        <img src={pressureIcon} alt="Pressure" width={30} />
        <div>
          <p>Давление {getPressure(currentForecast.main.pressure)} мм.рт.ст.</p>
        </div>
      </div>
      <div className={styles.wind}>
        <img src={windIcon} alt="Wind" width={30} />
        <div>
          <p>Ветер {currentForecast.wind.speed} м/с</p>
        </div>
      </div>
    </div>
  );
}
