import Button from 'components/Button';

import styles from './ErrorBlock.module.css';

export default function ErrorBlock() {
  return (
    <div className={styles['errorBlock']}>
      <h1>
        Something went wrong <br />
        ErrorBoundary worked!
      </h1>
      <Button
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload app
      </Button>
    </div>
  );
}
