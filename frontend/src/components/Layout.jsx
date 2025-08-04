import React from "react";
import { Outlet } from "react-router-dom";
import { NotificationProvider } from "../context/NotificationContext.jsx";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <NotificationProvider>
      <main className={styles.mainLayout}>
        <div className={styles.appContainer}>
          <h1 className={styles.appHeader}>Nested Nodes App</h1>
          {children}
        </div>
      </main>
    </NotificationProvider>
  );
};

export default Layout;
