import "App.css";
import styles from 'components/Others/css/Footer.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <section className={styles.footerSection}>
            <h3>Contact Us</h3>
            <p>123 Street, City</p>
            <p>Email: shiyang2575326696@gmail.com</p>
            <p>Phone: 123-456-7890</p>
          </section>
          <section className={styles.footerSection}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Features</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
          </section>
          <aside className={styles.footerSection}>
            <h3>Follow Us</h3>
            <ul className={styles.socialIcons}>
              <Link to="https://www.facebook.com/"><i className="fa-brands fa-facebook-f"></i></Link>
              <Link to="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></Link>
              <Link to="https://twitter.com/"><i className="fa-brands fa-twitter"></i></Link>
              <Link to="https://www.youtube.com/"><i className="fa-brands fa-youtube"></i></Link>
            </ul>
          </aside>
        </div>
        <p className={styles.footerText}>&copy; 2023 Your Company. All rights reserved.</p>
        <p className={styles.footerText}>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
}
