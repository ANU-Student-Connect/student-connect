import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext()

    const login = async (email, password) => {
        const success = handleInputErrors(email, password);
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch('api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success('Login successful');
            localStorage.setItem('auth-user', JSON.stringify(data));
            setAuthUser(data);
            //console.log(response.data);
            navigate('/message')
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading , login };
}

export default useLogin;

function handleInputErrors(email, password) {
	if (!email || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}