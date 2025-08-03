import React from "react";
import { Outlet } from "react-router-dom";
import { NotificationProvider } from "../context/NotificationContext.jsx";

const Layout = () => {
  return (
    <NotificationProvider>
      <main>
        <Outlet />
      </main>
    </NotificationProvider>
  );
};

export default Layout;
