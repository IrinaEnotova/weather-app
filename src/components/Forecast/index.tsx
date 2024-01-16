import { Forecast } from 'interfaces/API.interfaces';

import { DAYS_OF_WEEK } from 'utils/constants';
import getIcon from 'utils/getIcon';
import getPressure from 'utils/getPressure';

import pressureIcon from 'assets/pressure.svg';
import temperatureIcon from 'assets/temperature.svg';
import windIcon from 'assets/wind.svg';

import styles from './Forecast.module.css';

type ForecastBlockProps = {
  forecast: Forecast;
};

export default function ForecastBlock({ forecast }: ForecastBlockProps) {
  const today = forecast.list[0];
  const date = new Date(today.dt_txt);
  const day = date.getDay();
  const currentIcon = getIcon(today.weather[0].icon);

  return (
    <div className={styles.wrapper}>
      <p>
        Сейчас {DAYS_OF_WEEK[day]} {date?.toLocaleDateString()}
      </p>
      <p>{today.weather[0].description}</p>
      <h1>
        {forecast.name} <span className={styles.icon}>{currentIcon}</span>
      </h1>
      <div className={styles.temperature}>
        <img src={temperatureIcon} alt="Temperature" width={30} />
        <div>
          <p>За окном {today.main.temp.toFixed()}&deg;C</p>
          <p>Ощущается как {today.main.feels_like.toFixed()}&deg;C</p>
        </div>
      </div>
      <div className={styles.pressure}>
        <img src={pressureIcon} alt="Pressure" width={30} />
        <div>
          <p>Давление {getPressure(today.main.pressure)} мм.рт.ст.</p>
        </div>
      </div>
      <div className={styles.wind}>
        <img src={windIcon} alt="Wind" width={30} />
        <div>
          <p>Ветер {today.wind.speed} м/с</p>
        </div>
      </div>
    </div>
  );
}
