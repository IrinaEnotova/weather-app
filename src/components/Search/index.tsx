import { ChangeEvent } from 'react';

import { BtnAppearance } from 'enums/Btn.enums';

import { CityOption } from 'interfaces/API.interfaces';

import Button from 'components/Button';
import Overlay from 'components/Overlay';

import styles from './Search.module.css';

type SearchProps = {
  term: string;
  options: CityOption[] | null;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: CityOption) => void;
  onCitySubmit: () => void;
};

export default function Search({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onCitySubmit,
}: SearchProps) {
  return (
    <Overlay>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>
          <span className={styles.normalHeading}>Добро пожаловать в </span>
          Weather App
        </h2>
        <p className={styles.info}>
          Начните вводить город и выберите необходимый из выпадающего окна
        </p>
        <div className={styles.selectWrapper}>
          <input
            className={styles.select}
            type="text"
            value={term}
            onChange={onInputChange}
          />
          <Button onClick={onCitySubmit}>Загрузить</Button>
          {options ? (
            <ul className={styles.optionsList}>
              {options.map((option, idx) => (
                <li key={`${option.lat}-${idx}`} className={styles.optionsItem}>
                  <Button
                    appearance={BtnAppearance.Unstylized}
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}, {option.country}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Overlay>
  );
}
