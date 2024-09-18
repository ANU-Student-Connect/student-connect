import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => { 
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ email, password, confirmedPassword }) => { 
        const success = handleInputErrors({ email, password, confirmedPassword })
        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    confirmedPassword
                }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            
            
            localStorage.setItem('auth-user', JSON.stringify(data));

            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, signup};
}

export default useSignup;

function handleInputErrors({ email, password, confirmedPassword }) { 
    if (!email || !password || !confirmedPassword) { 
        toast.error('All fields are required');
    }

    if (password !== confirmedPassword) { 
        toast.error('Passwords do not match');
        return false;
    }

    if (password.length < 8) {
        toast.error('Password must be at least 8 characters');
        return false
    }

    return true;
}
