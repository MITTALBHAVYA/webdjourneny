import React from 'react';
import PageLayout from '../../components/PageLayout';
import { Link } from 'react-router-dom';
import './SignInPage.css'
import '../../style/style.css';

const SignInPage = () => {
  return (
    <PageLayout>
      <div className="upper-right-vector"></div>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">SLACK</Link>
        </div>
        <div className="signin-nav-func">
          <div className='question'>New to slack?</div>
          <div className='links_signup'>
          <Link to="/signup">Create an account</Link>
          </div>
        </div>
      </nav>
      <h1>Sign In Page</h1>
      {/* Additional sign-in page content */}
    </PageLayout>
  );
};

export default SignInPage;
