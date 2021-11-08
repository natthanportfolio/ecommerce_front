import React from "react";
import Menu from "./Menu";
import '../styles.css'
import Header from "./Header";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
      <Menu />
      <Header/>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
