import { Link } from 'react-router-dom';
import { useState } from 'react';
import useSignup from '../../hooks/useSignup';

const SignUp = () => { 

    const [input, setInput] = useState({
        email: '',
        password: '',
        confirmedPassword: ''
    });

    const { loading, signup } = useSignup();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        await signup(input);
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up
                    <span className = 'text-blue-500'> Student Connect</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>ANU Email Address</span>
                        </label>
                        <input type='text' placeholder='Enter fullName' className='w-full input input-bordered h-10'
                            value={input.email}
                            onChange={(e) => setInput({ ...input, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input type='password' placeholder='Enter ' className='w-full input input-bordered h-10'
                            value={input.password}
                            onChange={(e) => setInput({ ...input, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10'
                            value={input.confirmedPassword}
                            onChange={(e) => setInput({ ...input, confirmedPassword: e.target.value })}
                        />
                    </div>

                    <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Already a user? Login
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2'
                        disabled={loading}
                        >
                            {loading ? <span className='loading loading-spinner'></span> : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;