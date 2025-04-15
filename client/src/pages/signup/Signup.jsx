import { Link } from 'react-router-dom';
import { useState } from 'react';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        verificationCode: '',
        password: '',
        confirmedPassword: '',
        termsOfService: false,
        receiveEmails: false,
    });

    const { loading, signup } = useSignup();

    const handleSendCode = () => {
        alert('Verification code sent to ' + input.email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(input);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-stretch">
            {/* Left Side (Teal Section) */}
            <div className="md:w-1/2 bg-teal-700 text-white p-8 flex flex-col">
                {/* Top-left heading */}
                <div className="mb-4">
                    <h1 className="text-xl font-bold">ANU STUDENT CONNECT</h1>
                </div>

                {/* Center Form Container */}
                <div className="w-full flex-grow flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        Sign Up Here
                    </h2>

                    {/* Outer form spans full width */}
                    <form onSubmit={handleSubmit} className="w-full">
                        {/* Inner container spans 100% of teal width with centered content at 60% width and a black border */}
                        <div className="mx-auto w-3/5 relative">
                            {/* First and Last Name */}
                            <div className="flex flex-col md:flex-row md:space-x-2 mb-4">
                                <div className="md:w-1/2 mb-4 md:mb-0">
                                    <label className="block text-sm mb-1" htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        placeholder="Enter first name"
                                        className="input input-bordered w-full text-black"
                                        value={input.firstName}
                                        onChange={(e) =>
                                            setInput({ ...input, firstName: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="md:w-1/2">
                                    <label className="block text-sm mb-1" htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Enter last name"
                                        className="input input-bordered w-full text-black"
                                        value={input.lastName}
                                        onChange={(e) =>
                                            setInput({ ...input, lastName: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            {/* ANU Email Address */}
                            <div className="mb-4 relative">
                                <label className="block text-sm mb-1" htmlFor="email">
                                    ANU Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your ANU email"
                                    className="input input-bordered w-full text-black"
                                    value={input.email}
                                    onChange={(e) =>
                                        setInput({ ...input, email: e.target.value })
                                    }
                                />
                                {/* "Sending Code" placed outside the bordered area */}
                                <span
                                    onClick={handleSendCode}
                                    className="absolute left-full ml-2 bottom-0 text-white underline cursor-pointer whitespace-nowrap"
                                >
                                    Sending Code
                                </span>
                            </div>

                            {/* Verification Code */}
                            <div className="mb-4">
                                <label className="block text-sm mb-1" htmlFor="verificationCode">
                                    Verification Code
                                </label>
                                <input
                                    id="verificationCode"
                                    type="text"
                                    placeholder="Enter verification code"
                                    className="input input-bordered w-full text-black"
                                    value={input.verificationCode}
                                    onChange={(e) =>
                                        setInput({ ...input, verificationCode: e.target.value })
                                    }
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label className="block text-sm mb-1" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    className="input input-bordered w-full text-black"
                                    value={input.password}
                                    onChange={(e) =>
                                        setInput({ ...input, password: e.target.value })
                                    }
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-4">
                                <label className="block text-sm mb-1" htmlFor="confirmedPassword">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmedPassword"
                                    type="password"
                                    placeholder="Re-enter password"
                                    className="input input-bordered w-full text-black"
                                    value={input.confirmedPassword}
                                    onChange={(e) =>
                                        setInput({ ...input, confirmedPassword: e.target.value })
                                    }
                                />
                            </div>

                            {/* Terms of Service */}
                            <div className="mb-2">
                                <label className="inline-flex items-center text-sm">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm mr-2"
                                        checked={input.termsOfService}
                                        onChange={(e) =>
                                            setInput({ ...input, termsOfService: e.target.checked })
                                        }
                                    />
                                    I agree to our{' '}
                                    <span className="underline ml-1">Terms of Service</span>
                                </label>
                            </div>

                            {/* Receive Emails & Privacy Policy */}
                            <div className="mb-4">
                                <label className="inline-flex items-start text-sm break-words">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm mr-2 mt-1"
                                        checked={input.receiveEmails}
                                        onChange={(e) =>
                                            setInput({ ...input, receiveEmails: e.target.checked })
                                        }
                                    />
                                    <span>
                                        Sign up to receive emails about newest activity and news, and consent to{' '}
                                        <span className="underline">Privacy Policy</span>
                                    </span>
                                </label>
                            </div>

                            {/* Sign Up Button */}
                            <div className="flex flex-col items-center mb-3">
                                <input
                                    type="submit"
                                    value={loading ? 'Loading...' : 'Sign Up'}
                                    className="signup-button font-medium rounded-md shadow hover:bg-gray-100 transition duration-200 cursor-pointer"
                                    disabled={loading}
                                />
                            </div>

                            {/* Already a member? */}
                            <div className="flex justify-center">
                                <p className="text-sm text-center">
                                    Already a member?{' '}
                                    <Link to="/login" className="underline text-blue-100">
                                        Log In
                                    </Link>
                                </p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            {/* Right Side (Background Image + Text) */}
            <div className="md:w-1/2 relative">
                <img
                    src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg"
                    alt="Students"
                    className="w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* "Explore New Friendship" - Top 1/3 */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-2 md:px-8 z-10">
                    <h2 className="text-2xl md:text-5xl font-bold whitespace-nowrap overflow-hidden max-w-full">
                        Explore New Friendship
                    </h2>
                </div>

                {/* "Start Your Journey" - Top 2/3 */}
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