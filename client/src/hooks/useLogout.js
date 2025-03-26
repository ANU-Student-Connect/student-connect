import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext()

    const logout = async (email, password) => {
        setLoading(true);
        try {
            const res = await fetch('api/auth/logout', {
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
            toast.success('Logout successful');
            localStorage.removeItem('auth-user');
            setAuthUser({});
            navigate('/login')
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading , logout };
}

export default useLogout;