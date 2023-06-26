import "./components.css";
import styles from "./css/Header.module.css";
import user from "../icons/user.svg";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ state }) {
  const { isSignedIn, cookies } = state;

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>EmploVerse</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="user">Dashboard</Link>
          </li>
          <li>
            <Link to="employees">Employee List</Link>
          </li>
          <li className={styles.dropdown}>
            <Link to={isSignedIn ? "#" : "signin"}>
              {isSignedIn ? <img src={user}></img> : "Sign in"}
            </Link>
            {isSignedIn && (
              <ul className={styles["dropdown-menu"]}>
                <li>
                  <Link to="user">Profile</Link>
                </li>
                <li>
                  <Link to="/switch">Switch</Link>
                </li>
                <li>
                  <Link to="/logout">Log out</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
