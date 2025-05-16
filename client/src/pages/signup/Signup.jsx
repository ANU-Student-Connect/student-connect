import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
  const navigate = useNavigate();
  const { loading: signingUp, signup } = useSignup();
  const [step, setStep] = useState('signup');
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: '',
    ///verificationCode: '',
  });
  const [error, setError] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signup({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        confirmedPassword: input.confirmedPassword,
      });
      setStep('verify');
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  const handleVerify = async () => {
    if (!input.verificationCode) {
      setError('Please enter the code you received');
      return;
    }
    setError(null);
    setVerifying(true);
    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: input.verificationCode }),
      });
      const data = await res.json();
      setVerifying(false);
      if (!res.ok) throw new Error(data.message || 'Verification failed');
      navigate('/login', { state: { verified: true } });
    } catch (err) {
      setVerifying(false);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch">
      <div className="md:w-1/2 bg-teal-700 text-white p-8 flex flex-col">
        <h1 className="text-xl font-bold mb-4">ANU STUDENT CONNECT</h1>

        <div className="w-full flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {step === 'signup' ? 'Sign Up Here' : 'Verify Your Email'}
          </h2>

          {error && (
            <div className="mb-4 text-red-200 bg-red-800 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={step === 'signup' ? handleSubmit : (e) => e.preventDefault()}
            className="w-full"
          >
            <div className="mx-auto w-3/5 relative">
              {step === 'signup' && (
                <>
                  {/* First + Last Name */}
                  <div className="flex flex-col md:flex-row md:space-x-2 mb-4">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                      <label htmlFor="firstName" className="block text-sm mb-1">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className="input input-bordered w-full text-black"
                        value={input.firstName}
                        onChange={(e) =>
                          setInput({ ...input, firstName: e.target.value })
                        }
                        disabled={signingUp}
                      />
                    </div>
                    <div className="md:w-1/2">
                      <label htmlFor="lastName" className="block text-sm mb-1">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className="input input-bordered w-full text-black"
                        value={input.lastName}
                        onChange={(e) =>
                          setInput({ ...input, lastName: e.target.value })
                        }
                        disabled={signingUp}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm mb-1">
                      ANU Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="input input-bordered w-full text-black"
                      value={input.email}
                      onChange={(e) =>
                        setInput({ ...input, email: e.target.value })
                      }
                      disabled={signingUp}
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="input input-bordered w-full text-black"
                      value={input.password}
                      onChange={(e) =>
                        setInput({ ...input, password: e.target.value })
                      }
                      disabled={signingUp}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label htmlFor="confirmedPassword" className="block text-sm mb-1">
                      Confirm Password
                    </label>
                    <input
                      id="confirmedPassword"
                      type="password"
                      className="input input-bordered w-full text-black"
                      value={input.confirmedPassword}
                      onChange={(e) =>
                        setInput({ ...input, confirmedPassword: e.target.value })
                      }
                      disabled={signingUp}
                    />
                  </div>
                </>
              )}

              {/* Verification Code */}
              {step === 'verify' && (
                <div className="mb-4">
                  <label htmlFor="verificationCode" className="block text-sm mb-1">
                    Verification Code - Remember to check your spam folder
                  </label>
                  <input
                    id="verificationCode"
                    type="text"
                    className="input input-bordered w-full text-black"
                    value={input.verificationCode}
                    onChange={(e) =>
                      setInput({ ...input, verificationCode: e.target.value })
                    }
                    disabled={verifying}
                  />
                </div>
              )}

              {/* Submit / Verify Button */}
              <div className="flex flex-col items-center mb-3">
                {step === 'signup' ? (
                  <input
                    type="submit"
                    value={signingUp ? 'Signing Up…' : 'Sign Up'}
                    className="signup-button font-medium rounded-md shadow hover:bg-gray-100 transition duration-200 cursor-pointer"
                    disabled={signingUp}
                  />
                ) : (
                  <input
                    type="button"
                    value={verifying ? 'Verifying…' : 'Verify Email'}
                    onClick={handleVerify}
                    disabled={verifying}
                    className="signup-button font-medium rounded-md shadow hover:bg-gray-100 transition duration-200 cursor-pointer"
                  />
                )}
              </div>

              <div className="flex justify-center">
                {step === 'signup' && (
                  <p className="text-sm text-center">
                    Already a member?{' '}
                    <Link to="/login" className="underline text-blue-100">
                      Log In
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg"
          alt="Students"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-2 md:px-8 z-10">
          <h2 className="text-2xl md:text-5xl font-bold whitespace-nowrap overflow-hidden max-w-full">
            Explore New Friendship
          </h2>
        </div>
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-2 md:px-8 z-10">
          <h2 className="text-2xl md:text-5xl font-bold whitespace-nowrap overflow-hidden max-w-full">
            Start Your Journey
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
