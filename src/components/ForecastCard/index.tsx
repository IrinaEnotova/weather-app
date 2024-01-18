import { Forecast } from 'interfaces/API.interfaces';

import getDateString from 'utils/getDateString';
import getIcon from 'utils/getIcon';
import getPressure from 'utils/getPressure';
import getTimeString from 'utils/getTimeString';

import pressureIcon from 'assets/pressure.svg';
import temperatureIcon from 'assets/temperature.svg';
import windIcon from 'assets/wind.svg';

import styles from './ForecastCard.module.css';

type ForecastCardProps = {
  forecast: Forecast;
  step: number;
};

export default function ForecastCard({ forecast, step }: ForecastCardProps) {
  const cardData = forecast.list[step];
  const date = new Date(cardData.dt_txt);
  const currentIcon = getIcon(cardData.weather[0].icon);

  return (
    <div className={styles.card}>
      <p>{getDateString(date)}</p>
      <p>{getTimeString(date)}</p>
      <p>
        {cardData.weather[0].description}{' '}
        <span className={styles.icon}>{currentIcon}</span>
      </p>
      <div className={styles.temperature}>
        <img src={temperatureIcon} alt="Temperature" width={30} />
        <div>
          <p>{cardData.main.temp.toFixed()}&deg;C</p>
        </div>
      </div>
      <div className={styles.pressure}>
        <img src={pressureIcon} alt="Pressure" width={30} />
        <div>
          <p>{getPressure(cardData.main.pressure)} мм.рт.ст.</p>
        </div>
      </div>
      <div className={styles.wind}>
        <img src={windIcon} alt="Wind" width={30} />
        <div>
          <p>{cardData.wind.speed} м/с</p>
        </div>
      </div>
    </div>
  );
}
