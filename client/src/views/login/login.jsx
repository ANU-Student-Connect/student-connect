
import React from 'react';
import './login.css';

function LoginView() {
  return (
    <div className="login-page">
      <div className="form-container">
        <h1 className='pos-top'>ANU STUDENT CONNECT</h1>
        <h2 className='main-title'>Sign In</h2>
        <form>
          <label>Username</label>
          <input type="email" placeholder="example@email.com" />

          <label>Password</label>
          <div className="password-container row">
            <input type="password" placeholder="********" />
            <span className="icon-password" style={{top: '3px'}}></span>
          </div>
          <a href="#" className='fold text-decoration'>Forgot password?</a>
          <button type="submit" className='btn'>Sign In</button>
        </form>
        <p >Don’t have an account? <a href="/#/register" className="text-decoration">Sign Up</a></p>
      </div>

      <div className="welcome-container login">
        <div className="word">
          <h1>Welcome to</h1>
          <h1>Student Connect Family!</h1>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
