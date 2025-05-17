import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // Adjust path if needed

const useProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //const [profile, setProfile] = useState(null); // Store user profile info
  const { setAuthUser } = useAuthContext();

  // fetch user profile from backend
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      // const res = await fetch('/api/user/profile');
      // if (!res.ok) throw new Error('Failed to fetch profile');
      // const data = await res.json();
      // setProfile(data.data); // Save profile to state

      const fakeResponse = {
        success: true,
        data: {
          user_id: "u1001",
          email: "u1001@anu.edu.au",
          profile: {
            name: "Alex Johnson",
            avatar_url: "https://gravatar.com/avatar/f95c780bd082238c8a435d3549bb09be?s=400&d=robohash&r=x",
            uid: "u0000001",
            phone: "+61 412 345 678",
            bio: "Software engineer with a passion for hiking and photography. Always looking to connect with like-minded individuals!",
            major: "Computer Science",
            social_media: {
              instagram: "@alexj_photos",
              facebook: "@alex_codes",
              discord: "alexjohnson-dev",
              slack:"@alex_slack"
            },
            created_at: "2024-08-15T10:24:32Z",
            last_active: "2025-04-30T12:40:15Z"
          }
        }
      };
      //setProfile(fakeResponse.data);
      return fakeResponse.data
      
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
