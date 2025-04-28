import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import "./login.css"

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
        const userData = {
            email: email,
            password: password
        };
		await login(email, password);
	};

	return (
		<div className="login-page">
            <div className="form-container">
                <h1 className="pos-top">ANU STUDENT CONNECT</h1>
                <h2 className="main-title">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input className='w-full input input-bordered h-10 px-2 text-gray-700' type="email" placeholder="Enter your ANU email address" onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <div className="password-container row">
                        <input className='w-full input input-bordered h-10 px-2 text-gray-700' type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                        <span
                            className="icon-password" x
                            style={{ top: "3px" }}
                        ></span>
                    </div>
					<div>
						<button className='btn btn-block btn-sm mt-5 w-full text-gray-700' disabled={loading}>
							Login
						</button>
					</div>
                </form>
                <p>
					<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						New User? Signup
					</Link>
                </p>
            </div>

            <div className="welcome-container login">
                <div className="word">
                    <h1>Welcome to</h1>
                    <h1>Student Connect Family!</h1>
                </div>
            </div>
        </div>
	);
};
export default Login;