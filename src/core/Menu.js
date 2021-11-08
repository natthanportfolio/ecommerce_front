import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import "../styles.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#000000" };
  } else {
    return { color: "#000000" };
  }
};

const Menu = ({ history }) => (
  <div className="menubar">
    <div className="container">
      <div className="logo">
        <h1>Baanchok</h1>
      </div>
      <ul className="menu">
        <li>
          <Link style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li>
            <Link
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li>
        <Link style={isActive(history, "/shop")} to="/shop">
          Shop
        </Link>
      </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li>
        <Link  style={isActive(history, "/cart")} to="/cart">
          Cart {" "}
          <sup><small className="cart-badge">{itemTotal()}</small>"</sup>
        </Link>
      </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li>
            <Link
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li>
              <Link style={isActive(history, "/signin")} to="/signin">
                Signin
              </Link>
            </li>

            <li>
              <Link style={isActive(history, "/signup")} to="/signup">
                Signup
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li>
            <span
              style={{ cursor: "pointer", color: "#000000" }}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  </div>
);
export default withRouter(Menu);
