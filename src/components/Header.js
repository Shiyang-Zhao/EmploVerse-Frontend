import "./components.css";
import styles from "./css/Header.module.css";
import user from "../media/icons/user.svg";
import togglerIcon from '../media/icons/toggler.svg';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ state }) {
  const { isSignedIn, cookies } = state;
  const isAdmin = cookies.selectedRole?.[0] === 'ROLE_ADMIN';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth > 700);
    };
    // Add event listener for resize events
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>EmploVerse</h1>
      </Link>

      <nav>
        <button className={styles.toggleButton}>
          <img
            src={togglerIcon}
            className={styles.togglerIcon}
            onClick={handleToggleMenu}
            alt="Toggle Menu"
          />
        </button>
        <ul className={isMenuOpen ? styles.show : styles.hide}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="user">Dashboard</Link>
          </li>
          {isSignedIn && (
            <>
              {isAdmin && (
                <li>
                  <Link to="users">User List</Link>
                </li>
              )}
              
              <li>
                <Link to="employees">Employee List</Link>
              </li>
              <li className={styles.dropdown}>
                <Link to="user">
                  <img src={user} alt="User" />
                </Link>
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
              </li>
            </>
          )}
          {!isSignedIn && (
            <li>
              <Link to="signin">Sign in</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
