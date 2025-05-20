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
            
            if(data.user.isFirstLogin)
            {
                data.user.isFirstLogin = false;
                const res = await fetch('/api/users/edit', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data.user),
                });

                const text = await res.text();
                let result;
                try {
                    result = JSON.parse(text);
                } catch (parseError) {
                    throw new Error("Server response is not valid JSON");
                }

                if (!res.ok) {
                    throw new Error(result.message || 'Failed to update first login status');
                }
                navigate('/questionstart');
            }
            else
            {
                toast.success('Login successful');
                navigate('/home');
            }
            
            localStorage.setItem('auth-user', JSON.stringify(data.user));
            setAuthUser(data.user);
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