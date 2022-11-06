import React, { PropsWithChildren } from "react";
import { Banner } from "../pages/index/Banner";

import styles from "./Layout.module.css";


export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}><Banner /></div>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.footer}/>
    </div>
  );
}
