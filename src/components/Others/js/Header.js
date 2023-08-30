//import "App.css";
import styles from "components/Others/css/Header.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ state }) {
  const { isSignedIn, cookies } = state;
  const isAdmin = cookies.selectedRole?.[0] === 'ROLE_ADMIN';
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 700);
  const isAtHome = window.location.pathname === "/" ? `${styles.atHome}` : `${styles.notAtHome}`;

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
  }, []);

  return (
    <header className={`${styles.header} ${isAtHome}`} onMouseLeave={window.innerWidth < 700 ? () => setIsMenuOpen(false) : null}>
      <Link to="/">
        <h1 >EmploVerse</h1>
      </Link>

      <nav>
        <button className={styles.toggleButton}>
          <i className={`fa-solid fa-bars fa-2xl`} onClick={handleToggleMenu}></i>
        </button>
        {isMenuOpen &&
          <ul>
            <li >
              <Link to="/" >Home</Link>
            </li>
            <li>
              <Link to="employees/currentEmployeeProfile" >Dashboard</Link>
            </li>
            {isSignedIn ? (
              <React.Fragment>
                {isAdmin && (
                  <li>
                    <Link to="users" >Users</Link>
                  </li>
                )}

                <li>
                  <Link to="employees" >Employees</Link>
                </li>
                <li className={styles.dropdown}>
                  <Link to="user">
                    <i className={`fa-solid fa-user-tie fa-2xl`} ></i>
                  </Link>
                  <ul>
                    <li>
                      <Link to="user" >Profile</Link>
                    </li>
                    <li>
                      <Link to="/switch" >Switch</Link>
                    </li>
                    <li>
                      <Link to="/logout" >Log out</Link>
                    </li>
                  </ul>
                </li>
              </React.Fragment>
            ) :
              <React.Fragment>
                <li>
                  <Link to="signin" >Sign in</Link>
                </li>
              </React.Fragment>
            }
          </ul>}
      </nav>
    </header>
  );
}
