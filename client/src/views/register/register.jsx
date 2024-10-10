
import React from 'react';
import './register.css';

function LoginView() {
  return (
    <div className="login-page">
      <div className="form-container">
        <h1 className='pos-top'>ANU STUDENT CONNECT</h1>
        <h2 className='main-title'>Sign Up Here</h2>
        <form>
          <div className="row">
            <div className="col">
              <label>First Name</label>
              <input type="text" placeholder="" />
            </div>
            <div className="col">
              <label>Last Name</label>
              <input type="text" placeholder="" />
            </div>
          </div>
          <div className="row">
            <div className="col email-col">
              <label>ANU Email Address</label>
              <input type="email" placeholder="" />
              <p className="send-code">Sending Code</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
                <label>Verification Code</label>
                <input type="text" placeholder="" />
            </div>
          </div>
          <div className="row">
            <div className="col">
                <label>Password</label>
                <input type="password" placeholder="" />
                <span className="icon-password"></span>
            </div>
          </div>
          <div className="row">
            <div className="col">
                <label>Confirm Password</label>
                <input type="password" placeholder="" />
                <span className="icon-password"></span>
            </div>
          </div>
          <div className="row checkbox">
            <input type="checkbox" id="option3" name="options" value="option3" />
            <label htmlFor="option3">I agree to our <span className="text-decoration">Terms of Service</span></label>
          </div>
          <div className="row checkbox">
            <input type="checkbox" id="option3" name="options" value="option3" />
            <label htmlFor="option3">Sign up tp receive emails from us about newest activity and news, and consent to <span className="text-decoration">Privacy Policy</span></label>
          </div>
          <button type="submit" className='btn'>Sign Up</button>
        </form>
        <p >Already a member? <a href="#" className="text-decoration">Log In</a></p>
      </div>

      <div className="welcome-container register">
        <div className="word">
          <h1>Start Your Journey</h1>
          <h1>Explore new FaFriendship</h1>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
