import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // Adjust path if needed

const useProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null); // Store user profile info
  const { setAuthUser } = useAuthContext();

  // fetch user profile from backend
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/profile'); // Change to your API endpoint
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      setProfile(data); // Save profile to state
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // edit user profile
  const editUserProfile = async (updatedData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      toast.success('Profile updated');
      await fetchUserProfile(); // Refresh profile data after update
    } catch (err) {
      toast.error(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  // auto-fetch profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return { loading, profile, fetchUserProfile, editUserProfile };
};

export default useProfile;
