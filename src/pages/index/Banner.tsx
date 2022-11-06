import React from 'react';
import styles from './Banner.module.css';
import { Link } from "react-router-dom";

export function Banner() {
  return (
    <div className={styles.banner_render}>
      <Link to={"/"}>
        <div className={styles.banner_profile_image_wrapper}>
          <div className={styles.banner_profile_image} />
        </div>
        <div className={styles.banner_wrapper}>
          <div className={styles.banner_header}>
            Orwello
          </div>
        </div>
        <Link to={"/collection"}>
          <div className={styles.collection}>
            <div className={styles.navLink}>
              Collection
            </div>
          </div>
        </Link>
      </Link>
    </div>
  );
}
