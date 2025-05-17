import React, { useState, useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import TopBar from "../../components/basic/TopBar";
import { FaFacebook, FaInstagram, FaDiscord, FaSlack } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Modal from "react-modal";
import DefaultAvater from "../../assets/pic/defaultavater.png";

Modal.setAppElement("#root");

const UserProfile = () => {
    const { fetchUserProfile, editUserProfile, fetchAvatarPool } = useProfile();  
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);  // Whether the profile is in editing mode
    const [editUser, setEditUser] = useState(null); // Stores the modified user info when editing
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [loading, setLoading] = useState(true);   // Whether the data is still being fetched
    const [error, setError] = useState(null);  // Holds any error messages
    const [isAvatarOpen, setIsAvatarOpen] = useState(false);
    const [isBasicOpen, setIsBasicOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [image, setImage] = useState(null); // Default avatar

     // Commented out data fetching logic
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserProfile();
                if (userData && userData.profile) {
                    setLoading(false);
                    setUser(userData);  // Set the fetched user data
                    setEditUser(userData);  // Initialize editUser with fetched data
                    setImage(userData.profile.avatar_url);
                    setSelectedAvatar(userData.profile.avatar_url);
                } else {
                    setError("User data is not available");
                }
            } catch (err) {
                setError("Error fetching user profile data");
            }
        };

        const loadAvatars = async () => {
            try {
                const data = await fetchAvatarPool();
                setAvatars(data);
            } catch (err) {
                console.error("Error fetching avatar pool:", err);
            }
        };
        fetchData();
        loadAvatars();
    }, []);

    // Triggered when a field value changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split(".");

        setEditUser(prev => {
            const newData = { ...prev };
            let temp = newData;

            for (let i = 0; i < keys.length - 1; i++) {
                temp[keys[i]] = { ...temp[keys[i]] };
                temp = temp[keys[i]];
            }

            temp[keys[keys.length - 1]] = value;
            return newData;
        });
    };


    // Commented out save functionality
    const handleSave = async () => {
        try {
            
            const result = await editUserProfile(editUser); 
            if (result.success) {
                setUser(editUser);
                setIsEditing(false); 
                setIsAvatarOpen(false);
                setIsBasicOpen(false);
                setIsDetailOpen(false);
            }

        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div className="w-full h-full min-h-screen bg-white shadow-lg rounded-lg flex flex-col">
            <TopBar currentPage="userprofile" />
            <div className="text-2xl text-left font-bold pt-4 pb-4 pl-4 border-b border-gray-300">
                Profile
            </div>
            {/* Avatar & basic info */}
            <div className="mt-6 flex items-center space-x-12 pb-4 border-b border-gray-300 relative">
                <span
                    className="absolute top-2 right-6 font-bold text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => setIsBasicOpen(true)}
                >
                    Edit
                </span>

                <div className="relative w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => setIsAvatarOpen(true)}
                >
                    <img src={user?.profile.avatar_url} className="w-full h-full object-cover rounded-full" />
                    <MdEdit className="absolute bottom-0 right-0 text-black hover:text-blue-500 transition duration-200 cursor-pointer" size={20} />
                </div>
                <div>
                    <h1 className="text-4xl font-semibold">{user?.firstName + user?.lastName}</h1>
                    <p className="text-sm text-gray-500 mt-6">Major in {user?.profile.major}</p>
                    <span className="text-gray-600 text-sm mt-4">Uid: {user?.profile.uid}</span>
                    <p className="text-gray-700 font-semibold mt-4 text-center italic">Bio: {user?.profile.bio}</p>
                </div>
            </div>

        
            {/* Details */}
            <div className="mt-6 pb-4 pl-4 border-b border-gray-300 flex-grow relative">
                <span
                    className="absolute top-2 right-6 font-bold text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => setIsDetailOpen(true)}
                >
                    Edit
                </span>
                <div className="grid grid-cols-3 gap-8">
                    {/* Email */}
                    <div className="flex items-center gap-4 max-w-full">
                        <span className="font-medium">Email:</span>
                        <span className="text-gray-700 bg-gray-200 w-64 px-2 py-1 rounded">{user?.email}</span>
                    </div>

                    {/* Instagram */}
                    <div className="flex items-center gap-4 max-w-full">
                        <a
                        href={user?.profile.social_media.instagram || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800 cursor-pointer"
                        >
                        <FaInstagram size={32} />
                        </a>
                        <a
                        href={user?.profile.social_media.instagram || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 bg-gray-50 w-64 px-2 py-1 rounded cursor-pointer hover:underline"
                        >
                        {user?.profile.social_media.instagram || '\u00A0'}
                        </a>
                    </div>

                    {/* Facebook */}
                    <div className="flex items-center gap-4 max-w-full">
                        <a
                        href={user?.profile.social_media.facebook || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                        <FaFacebook size={32} />
                        </a>
                        <a
                        href={user?.profile.social_media.facebook || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 bg-gray-50 w-64 px-2 py-1 rounded cursor-pointer hover:underline"
                        >
                        {user?.profile.social_media.facebook || '\u00A0'}
                        </a>
                    </div>

                    {/* Phone (not a link) */}
                    <div className="flex items-center gap-4 max-w-full">
                        <span className="font-medium">Phone:</span>
                        <span className="text-gray-700 bg-gray-50 w-64 px-2 py-1 rounded">
                        {user?.profile.phone ? `+61 ${user.profile.phone}` : '\u00A0'}
                        </span>
                    </div>

                    {/* Discord */}
                    <div className="flex items-center gap-4 max-w-full">
                        <a
                        href={user?.profile.social_media.discord || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                        >
                        <FaDiscord size={32} />
                        </a>
                        <a
                        href={user?.profile.social_media.discord || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 bg-gray-50 w-64 px-2 py-1 rounded cursor-pointer hover:underline"
                        >
                        {user?.profile.social_media.discord || '\u00A0'}
                        </a>
                    </div>

                    {/* Slack */}
                    <div className="flex items-center gap-4 max-w-full">
                        <a
                        href={user?.profile.social_media.slack || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                        >
                        <FaSlack size={32} />
                        </a>
                        <a
                        href={user?.profile.social_media.slack || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 bg-gray-50 w-64 px-2 py-1 rounded cursor-pointer hover:underline"
                        >
                        {user?.profile.social_media.slack || '\u00A0'}
                        </a>
                    </div>
                    </div>

            </div>

            {/* Avatar Modal */}
            <Modal
                isOpen={isAvatarOpen}
                onRequestClose={() => {
                    setIsAvatarOpen(false);
                }}
                className="bg-white p-8 rounded-lg shadow-lg w-[500px] max-w-lg mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-xl font-semibold text-center">Avatar</h2>
                <div className="mt-4 flex flex-col items-center">
                    {/* Avatar Large Image */}
                    <img src={image} alt="Profile" className="w-48 h-48 object-cover rounded-full border" />
                    <div className="grid grid-cols-4 gap-10 mt-4 mb-6 max-h-72 overflow-y-auto">
                        {avatars?.map((avatar) => (
                        <img
                            key={avatar}
                            src={avatar}
                            alt="Avatar"
                            className={`w-20 h-20 object-cover rounded-full border-2 cursor-pointer ${selectedAvatar === avatar? 'border-4 border-green-600' : 'border-gray-300'}`}
                            onClick={() => {
                            setSelectedAvatar(avatar);
                            setImage(avatar);
                            }}
                        />
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    {/* Cancel */}
                    <button
                        onClick={() => {
                            setIsAvatarOpen(false);
                            setSelectedAvatar(user?.profile.avatar_url);
                        }}
                        className="w-1/2 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    
                    {/* Save */}
                    <button
                        onClick={()=>{
                            editUser.profile.avatar_url = selectedAvatar;
                            handleSave();
                        }}
                        className="w-1/2 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </Modal>
            
            {/* Basic Modal */}
            <Modal
            isOpen={isBasicOpen}
            onRequestClose={() => setIsBasicOpen(false)}
            className="bg-white p-8 rounded-lg shadow-lg w-[500px] max-w-lg mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
            <h2 className="text-xl font-semibold text-center">Basic Information</h2>
            <div className="mt-4 flex flex-col items-center">
                {/* UserName */}
                <div className="mb-4 w-full">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editUser?.firstName || ""}
                    onChange={(e) => handleChange(e)}
                    placeholder="First name"
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />

                <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mt-4 block">
                    Last Name
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editUser?.lastName || ""}
                    onChange={(e) => handleChange(e)}
                    placeholder="Last name"
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                </div>


                <div className="mb-4 w-full">
                    <label htmlFor="major" className="text-sm font-medium text-gray-700">Major</label>
                    <input
                        type="text"
                        id="major"
                        name="profile.major"
                        value={editUser?.profile.major} 
                        onChange={(e) => handleChange(e)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your major"
                    />
                </div>

                <div className="mb-4 w-full">
                    <label htmlFor="uid" className="text-sm font-medium text-gray-700">Uid</label>
                    <input
                        type="text"
                        id="uid"
                        name="profile.uid"
                        value={editUser?.profile.uid} 
                        onChange={(e) => handleChange(e)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md "
                        placeholder="Enter your Uid"
                    />
                </div>

                {/* Bio */}
                <div className="mb-4 w-full">
                    <label htmlFor="bio" className="text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                        id="bio"
                        name="profile.bio"
                        value={editUser?.profile.bio} 
                        onChange={(e) => handleChange(e)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Tell us something about yourself"
                        rows="4"
                    />
                </div>

                <div className="flex justify-between w-full mt-6">
                {/* Cancel */}
                <button
                    onClick={() => setIsBasicOpen(false)}
                    className="w-1/2 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500"
                >
                    Cancel
                </button>
                
                {/* Save */}
                <button
                    onClick={handleSave} // Assuming you have a `handleSave` function to save the changes
                    className="w-1/2 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Save
                </button>
                </div>
            </div>
            </Modal>


            {/* Detail Modal */}
            <Modal
                isOpen={isDetailOpen}
                onRequestClose={() => setIsDetailOpen(false)}
                className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-w-lg mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-xl font-semibold text-center">Details</h2>
                <div className="mt-4 flex flex-col items-center">
                    
                    {/* Phone */}
                    <div className="mb-4 w-full">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-700 text-sm">
                            +61
                            </span>
                            <input
                            type="text"
                            id="phone"
                            name="profile.phone"
                            value={editUser?.profile.phone || ''}
                            onChange={(e) => handleChange(e)}
                            className="flex-1 block w-full min-w-0 rounded-r-md px-4 py-2 border border-gray-300"
                            placeholder="Phone (without +61)"
                            />
                        </div>
                    </div>

                    {/* Facebook */}
                    <div className="mb-4 w-full">
                    <label htmlFor="facebook" className="text-sm font-medium text-gray-700">Facebook</label>
                    <input
                        type="text"
                        id="facebook"
                        name="profile.social_media.facebook"
                        value={editUser?.profile.social_media.facebook} // Assuming you're storing Facebook in `editDetails.facebook`
                        onChange={(e) => handleChange(e)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your Facebook link"
                    />
                    </div>
                    
                    {/* Instagram */}
                    <div className="mb-4 w-full">
                    <label htmlFor="instagram" className="text-sm font-medium text-gray-700">Instagram</label>
                    <input
                        type="text"
                        id="instagram"
                        name="profile.social_media.instagram"
                        value={editUser?.profile.social_media.instagram} 
                        onChange={(e) => handleChange(e)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your Instagram link"
                    />
                    </div>

                    {/* Discord */}
                    <div className="mb-4 w-full">
                    <label htmlFor="discord" className="text-sm font-medium text-gray-700">Discord</label>
                    <input
                        type="text"
                        id="discord"
                        name="profile.social_media.discord"
                        value={editUser?.profile.social_media.discord} 
                        onChange={(e) => handleChange(e)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your Discord link"
                    />
                    </div>
                    {/* Slack */}
                    <div className="mb-4 w-full">
                    <label htmlFor="slack" className="text-sm font-medium text-gray-700">Slack</label>
                    <input
                        type="text"
                        id="slack"
                        name="profile.social_media.slack"
                        value={editUser?.profile.social_media.slack} 
                        onChange={(e) => handleChange(e)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your Slack link"
                    />
                    </div>
                    
                    <div className="flex justify-between w-full mt-6">
                    {/* Cancel */}
                    <button
                        onClick={() => setIsDetailOpen(false)}
                        className="w-1/2 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    
                    {/* Save */}
                    <button
                        onClick={handleSave}
                        className="w-1/2 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Save
                    </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserProfile;
