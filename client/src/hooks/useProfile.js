import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // Adjust path if needed

const useProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  // fetch user profile from backend
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem('auth-user'))?._id;
      if (!userId) throw new Error('User ID not found in localStorage');

      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();

      localStorage.setItem('auth-user', JSON.stringify(data.user));
      return data.user;
      
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // edit user profile
  const editUserProfile = async (updatedData,shouldVerifyPhone) => {
  setLoading(true);
  try {

    if (!updatedData.firstName || updatedData.firstName.trim() === '') {
      throw new Error("First name cannot be empty");
    }
    if (!updatedData.lastName || updatedData.lastName.trim() === '') {
      throw new Error("Last name cannot be empty");
    }

    const phoneRegex = /^\d{9}$/;
    if (shouldVerifyPhone && (updatedData.profile?.phone.trim() === '' || !phoneRegex.test(updatedData.profile.phone))) {
      throw new Error("Phone number must be exactly 9 digits");
    }


    const res = await fetch('/api/users/edit', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData),
    });

    const text = await res.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (parseError) {
      throw new Error("Server response is not valid JSON");
    }

    if (!res.ok) {
      throw new Error(result.message || 'Failed to update profile');
    }

    toast.success('Profile updated');
    await fetchUserProfile();
    return { success: true };

  } catch (err) {
    toast.error(err.message || 'Update failed');
    return { success: false, error: err.message };
  } finally {
    setLoading(false);
  }
};



  const fetchAvatarPool = async () => {
    try {
      const response = await fetch('/api/avatars');
      const data = await response.json(); 
      return data.map(item => item.imageUrl);
    } catch (err) {
      console.error("Error fetching avatars:", err);
      return [];
    }
  };

  // auto-fetch profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return { loading, fetchUserProfile, editUserProfile, fetchAvatarPool };
};

export default useProfile;
