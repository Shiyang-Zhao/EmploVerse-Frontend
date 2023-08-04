import './components.css';
import styles from './css/Footer.module.css';
import facebook from '../media/icons/facebook.svg';
import instagram from '../media/icons/instagram.svg';
import twitter from '../media/icons/twitter.svg';
import youtube from '../media/icons/youtube.svg';
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
              <Link to="https://www.facebook.com/"><img src={facebook}></img></Link>
              <Link to="https://www.instagram.com/"><img src={instagram}></img></Link>
              <Link to="https://twitter.com/"><img src={twitter}></img></Link>
              <Link to="https://www.youtube.com/"><img src={youtube}></img></Link>
            </ul>
          </aside>
        </div>
        <p className={styles.footerText}>&copy; 2023 Your Company. All rights reserved.</p>
        <p className={styles.footerText}>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
}
