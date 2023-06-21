import { Helmet } from "react-helmet";
import styles from "./NotFound.module.css";

const NotFound = () => {
   return (
      <div className={styles.container}>
         <Helmet>
            <title>404 NOT FOUND</title>
         </Helmet>
         <div className={styles.notFoundStyle}>404 NOT FOUND</div>
      </div>
   );
};

export default NotFound;
