import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import styles from "./Welcome.module.css";

const Welcome = () => {
   return (
      <div className={styles.container}>
         <div className={styles.welcomeContainer}>
            <div>خوش آمدید</div>
            <div className={styles.buttons}>
               <Link to="/users/add">فرم افزودن کاربر</Link>
               <Link to="/users">مشاهده جدول</Link>
            </div>
         </div>
      </div>
   );
};

export default Welcome;
