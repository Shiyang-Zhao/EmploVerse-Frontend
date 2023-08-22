import "App.css";
import styles from 'components/Others/css/Home.module.css';
import React, { useEffect, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import EarthVideo from 'media/videos/Earth.mp4'
import Footer from 'components/Others/js/Footer'
import { API_URL, ScrollToTop, formatPath } from 'config';


export default function Home({ state }) {
  
  return (
    <main>
      {/* <div className={`${styles['gradient-top']} ${isAtTop ? styles.fadeOut : styles.fadeIn}`}></div> */}
      <video className={styles.earthVideo} src={EarthVideo} autoPlay loop muted />
      <Parallax speed={-40} scale={[0.8, 1.5, 'easeInOut']}>
        <div className={styles.welcomeContainer}>
          <div className={styles.welcome}>
            <h2>
              EmploVerse
              <span>EmploVerse</span>
              <span>EmploVerse</span>
              <span>Created by Shiayng Zhao</span>
            </h2>
          </div>
        </div>
      </Parallax>
      <Parallax>
        <section className={styles.featuresSection}>
          <h2>Key Features</h2>
          <ul className={styles['features-list']}>
            <li>Employee profiles with detailed information</li>
            <li>Employee list with search and pagination</li>
            <li>Add new employees to the system</li>
            <li>Edit existing employee details</li>
            <li>Delete employees from the system</li>
            <li>Role-based access control for managing user permissions</li>
          </ul>
        </section>
      </Parallax>
      <Parallax scale={[1, 1.3, 'easeInOut']}>
        <section className={styles.whyChooseSection}>
          <h2>Why Choose EmploVerse</h2>
          <div className={styles.whyChooseContainer}>
            <div className={styles['why-choose-item']}>
              <h3>Streamline HR Processes</h3>
              <p>Our EmploVerse automates and simplifies HR tasks, saving time and reducing errors.</p>
            </div>
            <div className={styles['why-choose-item']}>
              <h3>Enhance Employee Productivity</h3>
              <p>Efficiently manage employee information, schedules, and performance to boost overall productivity.</p>
            </div>
            <div className={styles['why-choose-item']}>
              <h3>Improve Data Accuracy</h3>
              <p>Ensure accurate and up-to-date employee data through centralized storage and automated data management.</p>
            </div>
            <div className={styles['why-choose-item']}>
              <h3>Enable Self-Service</h3>
              <p>Empower employees to access and update their own information, reducing HR administrative burden.</p>
            </div>
          </div>
        </section>
      </Parallax>
      <Parallax scale={[1, 1.3, 'easeInOut']}>
        <section className={styles.testimonialSection}>
          <h2>Client Testimonials</h2>
          <div className={styles.testimonialContainer}>
            <div className={styles.testimonial}>
              <p>"The EmploVerse has transformed our HR processes. It's user-friendly and highly efficient. We highly recommend it!"</p>
              <p className={styles['testimonial-author']}>- John Smith, HR Manager</p>
            </div>
            <div className={styles.testimonial}>
              <p>"We've been using the EmploVerse for years, and it has significantly streamlined our employee onboarding and performance tracking."</p>
              <p className={styles['testimonial-author']}>- Jane Doe, CEO</p>
            </div>
            <div className={styles.testimonial}>
              <p>"The EmploVerse is the best HR solution we have ever used. It has simplified our payroll management and enhanced our reporting capabilities."</p>
              <p className={styles['testimonial-author']}>- Alex Johnson, CFO</p>
            </div>
          </div>
        </section>
      </Parallax>
      <Parallax>
        <Footer />
      </Parallax>
    </main>
  );
}

