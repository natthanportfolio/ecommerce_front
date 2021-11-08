import React from "react";
import Menu from "./Menu";

import '../styles.css'
const AdminLayout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
      <Menu />
    <div className={className}>{children}</div>
  </div>
);




export default AdminLayout