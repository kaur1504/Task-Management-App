import React from 'react';
import './home.css'; 
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* Header with colored TaskManager */}
      <header className="home-header">
        <h1>
          <span className="highlight">GoEasy</span>
        </h1>
        <p className="tagline">The easiest way to manage tasks and stay productive.</p>
      </header>

      <main className="home-main">
        {/* Short 10-word description */}
        <section className="intro-section">
          <h2>Task Management Made Simple</h2>
          <p className="description">
            Organize, track, and complete your tasks easily. Boost productivity.
          </p>
        </section>

        {/* Features List */}
        <section className="features-section">
          <h2 className="Features">Features</h2>
          <ul>
            <li>📝 Create tasks and set deadlines</li>
            <li>✅ Mark tasks as complete</li>
            <li> *  Show Prioritize tasks</li>
          </ul>
        </section>

        {/* Login & SignUp Section */}
        <section className="cta-section">
          <h2>Get Started Now</h2>
          <Link to="/">
  <button className="cta-button">Sign Up/Login</button>
</Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2024 GoEasy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
