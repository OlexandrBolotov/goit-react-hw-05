import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h2>404 - Page Not Found</h2>
      <p>
        Go back to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
