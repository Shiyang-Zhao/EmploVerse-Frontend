import styles from "components/Others/css/Header.module.scss";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "components/Authentication/js/UserProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { logout, isSignedIn, isAdmin } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 700);
  const isAtHome = window.location.pathname === "/" ? `${styles['atHome']}` : `${styles['notAtHome']}`;

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth > 700);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`${styles['header']} ${isAtHome}`} onMouseLeave={window.innerWidth < 700 ? () => setIsMenuOpen(false) : null}>
      <Link to="/">
        <h1 >EmploVerse</h1>
      </Link>

      <nav>
        <button>
          <i className={`fa-solid fa-bars fa-2xl`} onClick={handleToggleMenu}></i>
        </button>
        {isMenuOpen &&
          <ul>
            <li >
              <Link to="/" >Home</Link>
            </li>

            {isSignedIn() ? (
              <React.Fragment>
                <li>
                  <Link to="current_employee" >Dashboard</Link>
                </li>

                <li>
                  <Link to="chat" >Chat</Link>
                </li>
                {isAdmin() && (
                  <li>
                    <Link to="users" >Users</Link>
                  </li>
                )}

                <li>
                  <Link to="employees" >Employees</Link>
                </li>
                <li className={styles['dropdown']}>
                  <Link to="current_user">
                    <i className={`fa-solid fa-user-tie fa-2xl`} ></i>
                  </Link>
                  <ul>
                    <li>
                      <Link to="current_user" >Profile</Link>
                    </li>
                    <li>
                      <Link onClick={handleLogout} >Log out</Link>
                    </li>
                  </ul>
                </li>
              </React.Fragment>
            ) :
              (<React.Fragment>
                <li>
                  <Link to="signin" >Sign in</Link>
                </li>
              </React.Fragment>)
            }
          </ul>}
      </nav>
    </header>
  );
}
