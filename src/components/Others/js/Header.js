//import "App.css";
import styles from "components/Others/css/Header.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ state }) {
  const { isSignedIn, cookies } = state;
  const isAdmin = cookies.selectedRole?.[0] === 'ROLE_ADMIN';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAtHome = window.location.pathname === "/" ? `${styles.atHome}` : '';
  const notAtHome = window.location.pathname === "/" ? '' : 'text-dark';

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
    <header className={`${styles.header} ${isAtHome}`}>
      <Link to="/">
        <h1 className={notAtHome}>EmploVerse</h1>
      </Link>

      <nav>
        <button className={styles.toggleButton}>
          <i className={`fa-solid fa-bars fa-2xl ${notAtHome}`} onClick={handleToggleMenu}></i>
        </button>
        <ul className={isMenuOpen ? styles.show : styles.hide}>
          <li >
            <Link to="/" className={notAtHome}>Home</Link>
          </li>
          <li>
            <Link to="employees/currentEmployeeProfile" className={notAtHome}>Dashboard</Link>
          </li>
          {isSignedIn && (
            <>
              {isAdmin && (
                <li>
                  <Link to="users" className={notAtHome}>Users</Link>
                </li>
              )}

              <li>
                <Link to="employees" className={notAtHome}>Employees</Link>
              </li>
              <li className={styles.dropdown}>
                <Link to="user">
                  <i className={`fa-solid fa-user-tie fa-2xl ${notAtHome}`} ></i>
                </Link>
                <ul className={styles.dropdownMenu}>
                  <li>
                    <Link to="user" className={notAtHome}>Profile</Link>
                  </li>
                  <li>
                    <Link to="/switch" className={notAtHome}>Switch</Link>
                  </li>
                  <li>
                    <Link to="/logout" className={notAtHome}>Log out</Link>
                  </li>
                </ul>
              </li>
            </>
          )}
          {!isSignedIn && (
            <li>
              <Link to="signin" className={notAtHome}>Sign in</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
