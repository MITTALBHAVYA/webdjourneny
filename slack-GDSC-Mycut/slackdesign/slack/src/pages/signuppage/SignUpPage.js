import React from 'react';
import PageLayout from '../../components/PageLayout';
import { Link } from 'react-router-dom';

import '../../style/style.css';
import './SignUpPage.css'



const SignUpPage = () => {
  return (
    <PageLayout>
      <div className="upper-right-vector"></div>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">SLACK</Link>
        </div>
      </nav>
      <h1>Sign Up</h1>
      {/* Additional sign-up page content */}
    </PageLayout>
  );
};

export default SignUpPage;