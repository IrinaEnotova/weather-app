import { ButtonHTMLAttributes, ReactNode } from 'react';

import { BtnAppearance, BtnSize } from 'enums/Btn.enums';

import cls from 'utils/classnames';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  appearance?: BtnAppearance;
  size?: string;
}

const Button = ({
  children,
  className,
  appearance = BtnAppearance.Partial,
  size = BtnSize.Big,
  ...props
}: ButtonProps) => {
  const isUnstylizedBtn = appearance === BtnAppearance.Unstylized;
  const isSeparateBtn = appearance === BtnAppearance.Separate;
  const isMediumBtn = size === BtnSize.Medium;

  return (
    <button
      {...props}
      className={cls(
        styles['button'],
        className,
        isSeparateBtn && styles.separateBtn,
        isMediumBtn && styles.mediumBtn,
        isUnstylizedBtn && styles.unstylizedBtn
      )}
    >
      {children}
    </button>
  );
};

export default Button;
