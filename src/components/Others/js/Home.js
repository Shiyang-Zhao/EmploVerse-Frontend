import styles from 'components/Others/css/Home.module.scss';
import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import Footer from 'components/Others/js/Footer'

export default function Home({ state }) {

  return (
    <main className={styles['main']}>
      <video className={styles['earth']} src="/media/videos/Earth.mp4" autoPlay loop muted />
      <Parallax speed={-30}>
        <div className={styles['welcome-container']}>
          <div className={styles['welcome']}>
            <h2>
              EmploVerse
              <span>EmploVerse</span>
              <span>EmploVerse</span>
              <span>Welcome</span>
            </h2>
          </div>
        </div>
      </Parallax>
      <Parallax>
        <section className={styles['features-container']}>
          <h2>Key Features</h2>
          <ul className={styles['features']}>
            <li>Employee profiles with detailed information</li>
            <li>Employee list with search and pagination</li>
            <li>Add new employees to the system</li>
            <li>Edit existing employee details</li>
            <li>Delete employees from the system</li>
            <li>Role-based access control for managing user permissions</li>
          </ul>
        </section>
      </Parallax>
      <Parallax speed={-10}>
        <section className={styles['why-choose-container']}>
          <h2>Why Choose EmploVerse</h2>
          <div className={styles['why-choose']}>
            <div>
              <h3>Streamline HR Processes</h3>
              <p>Our EmploVerse automates and simplifies HR tasks, saving time and reducing errors.</p>
            </div>
            <div>
              <h3>Enhance Employee Productivity</h3>
              <p>Efficiently manage employee information, schedules, and performance to boost overall productivity.</p>
            </div>
            <div>
              <h3>Improve Data Accuracy</h3>
              <p>Ensure accurate and up-to-date employee data through centralized storage and automated data management.</p>
            </div>
            <div>
              <h3>Enable Self-Service</h3>
              <p>Empower employees to access and update their own information, reducing HR administrative burden.</p>
            </div>
          </div>
        </section>
      </Parallax>
      <Parallax speed={-10}>
        <section className={styles['testimonial-container']}>
          <h2>Client Testimonials</h2>
          <div className={styles['testimonial']}>
            <div>
              <p>"The EmploVerse has transformed our HR processes. It's user-friendly and highly efficient. We highly recommend it!"</p>
              <h3>- John Smith, HR Manager</h3>
            </div>
            <div>
              <p>"We've been using the EmploVerse for years, and it has significantly streamlined our employee onboarding and performance tracking."</p>
              <h3>- Jane Doe, CEO</h3>
            </div>
            <div>
              <p>"The EmploVerse is the best HR solution we have ever used. It has simplified our payroll management and enhanced our reporting capabilities."</p>
              <h3>- Alex Johnson, CFO</h3>
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

