import React from 'react';
import PageLayout from '../../components/PageLayout';
import { Link } from 'react-router-dom';
import '../../style/style.css';
import './LandingPage.css'
import SpaceRobot from '../../components/SpaceRobot/SpaceRobot'
const LandingPage = () => {
  return (
    <PageLayout>
      <div className="upper-left-vector"></div>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">SLACK</Link>
        </div>
        <div className="landing-nav-func">
          <img src="./images/magnifine_glass.png" alt="MG"/>
          <div className="links">
            <Link to="/signin">Sign In</Link>
          </div>
          <div className="explore-button">
            <button>EXPLORE</button>
          </div>
        </div>
      </nav>
      {/* <h1>LandingPage</h1> */}
      {/* Add more content for the landing page here */}
      <div className="right-side-area">
        <div className="content">
          <h1 className='WhiteText'>Made For People.</h1>
          <h1 className='YelloText'>Built For Productivity</h1>
          <p className='connect'>Connect the right people, find anything that you need and automate the rest. That’s work in Slack, your productivity platform.</p>
        </div>
        <div className="signup_btns">
          <button className="email_signup_btn"><span>SIGN UP WITH EMAIL ADDRESS</span></button>
          <button className="ggl_signup_btn"><img src='./images/google_icon.png' alt='G' className='gimg'/><span>SIGN UP WITH GOOGLE</span></button>
        </div>
      </div>
      <div className="bottom-text">
        <p className="center-text">Slack is free to try for as long as you like</p>
      </div>
      <SpaceRobot/>
    </PageLayout>
  );
};

export default LandingPage;