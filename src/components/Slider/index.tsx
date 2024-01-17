import { useRef } from 'react';

import { Forecast } from 'interfaces/API.interfaces';

import { CARD_WIDTH } from 'utils/constants';

import Button from 'components/Button';

import leftArrow from 'assets/left-arrow.svg';
import rightArrow from 'assets/right-arrow.svg';

import styles from './Slider.module.css';
import ForecastCard from '../ForecastCard';

type SliderProps = {
  forecast: Forecast;
};

export default function Slider({ forecast }: SliderProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const onPrev = () => {
    if (container.current) {
      const containerWidth = container.current.scrollWidth;
      if (container.current.scrollLeft <= 0) {
        container.current.scrollLeft = containerWidth;
      } else {
        container.current.scrollLeft =
          container.current.scrollLeft - CARD_WIDTH;
      }
    }
  };

  const onNext = () => {
    if (container.current) {
      const containerWidth = container.current.scrollWidth;
      if (
        container.current.scrollLeft >=
        containerWidth - container.current.offsetWidth
      ) {
        container.current.scrollLeft = 0;
      } else {
        container.current.scrollLeft =
          container.current.scrollLeft + CARD_WIDTH;
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.slider}>
        <Button className={styles.prevBtn} onClick={onPrev}>
          <img src={leftArrow} alt="<" width={20} />
        </Button>
        <Button className={styles.nextBtn} onClick={onNext}>
          <img src={rightArrow} alt=">" width={20} />
        </Button>
        <div className={styles.container} ref={container}>
          {forecast.list.map((step, idx) => (
            <ForecastCard key={step.dt} forecast={forecast} step={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
