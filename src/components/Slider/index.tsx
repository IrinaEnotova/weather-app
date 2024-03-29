import { useRef } from 'react';
import { useAppSelector } from 'src/store';

import { CARD_WIDTH } from 'utils/constants';

import Button from 'components/Button';

import leftArrow from 'assets/left-arrow.svg';
import rightArrow from 'assets/right-arrow.svg';

import styles from './Slider.module.css';
import ForecastCard from '../ForecastCard';

export default function Slider() {
  const { forecast } = useAppSelector((state) => state.forecastReducer);
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
          {forecast ? (
            forecast.list.map((step, idx) => (
              <ForecastCard key={step.dt} forecast={forecast} step={idx} />
            ))
          ) : (
            <p>Что-то пошло не так...</p>
          )}
        </div>
      </div>
    </div>
  );
}
