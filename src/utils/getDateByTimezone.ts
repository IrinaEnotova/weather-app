import { CurrentForecast } from 'interfaces/API.interfaces';

export default function getDateByTimezone(data: CurrentForecast) {
  return new Date(data.dt * 1000 + data.timezone * 1000);
}
