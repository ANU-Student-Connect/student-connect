import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaDiscord, FaCamera } from "react-icons/fa";
import Modal from "react-modal";
import DefaultAvater from "../../assets/pic/defaultavater.png";

Modal.setAppElement("#root");

const UserProfile = () => {
    // This is temporary user data, it will be replaced with API data later.
    const [user, setUser] = useState({
        avatar: DefaultAvater,
        name: "StudentConnect",
        email: "StudentConnect@anu.edu.au",
        phone: "0448098231",
        about: "TRY TO RESTART AGAIN"
    });

    const [isEditing, setIsEditing] = useState(false);  // Whether the profile is in editing mode
    const [editUser, setEditUser] = useState(user); // Stores the modified user info when editing
    // const [loading, setLoading] = useState(true);   // Whether the data is still being fetched
    const [error, setError] = useState(null);  // Holds any error messages
    const [isAvatarOpen, setIsAvatarOpen] = useState(false);
    const [isBasicOpen, setIsBasicOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [image, setImage] = useState(DefaultAvater); // Default avatar

    // Triggered when a field value changes
    const handleChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    // Save changes
    const handleSave = async () => {
        try {
            setUser(editUser);

            const response = await axios.put('', editUser);  // Example API endpoint
            if (response.status === 200) {
                
            }

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    // if (loading) {
    //     return <div>Loading...</div>; 
    // }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div className="w-full h-full min-h-screen p-6 bg-white shadow-lg rounded-lg flex flex-col">
            <div className="text-4xl text-left font-bold pb-4 border-b border-gray-300">
                Profile
            </div>
            {/* Avatar & basic info */}
            <div className="mt-6 flex items-center space-x-12 pb-4 border-b border-gray-300 relative">
                <span
                    className="absolute top-2 right-4 text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => setIsBasicOpen(true)}
                >
                    Edit
                </span>

                <div className="relative w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => setIsAvatarOpen(true)}
                >
                    <img src={image} className="w-full h-full object-cover rounded-full" />
                    <FaCamera className="absolute bottom-0 right-0 text-black cursor-pointer" size={20} />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">{user.name}</h1>
                    <p className="text-sm text-gray-500 mt-6">SC ID: {user.phone}</p>
                    <span className="text-green-600 text-sm mt-4">● Active</span>
                    <p className="text-gray-700 text-xl font-semibold mt-4 text-center italic">{user.about}</p>
                </div>
            </div>

        
            {/* Details */}
            <div className="mt-6 pb-4 border-b border-gray-300 flex-grow relative">
                <span
                    className="absolute top-2 right-4 text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => setIsDetailOpen(true)}
                >
                    Edit
                </span>
                <div className="grid grid-cols-3 gap-8">
                    <div className="flex items-center gap-4 max-w-full">
                        <span className="font-medium">UID:</span>
                        <span className="text-gray-700 bg-gray-200 w-64 px-2 py-1 rounded">u7608986</span>
                    </div>
                    <div className="flex items-center gap-4 max-w-full">
                        <span className="font-medium">Email:</span>
                        <span className="text-gray-700 bg-gray-200 w-64 px-2 py-1 rounded">u7708986@anu.edu.au</span>
                    </div>
                    <div className="flex items-center gap-4 max-w-full">
                        <span className="font-medium">Phone:</span>
                        <span className="text-gray-700 bg-gray-50 w-64 px-2 py-1 rounded">0448098231</span>
                    </div>
                    <div className="flex items-center gap-4 max-w-full">
                        <a href="#" className="text-blue-600 hover:text-blue-800">
                            <FaFacebook size={32} />
                        </a>
                        <span className="text-gray-700 bg-gray-50 w-64 px-2 py-1 rounded">Facebook Link</span>
                    </div>
                    <div className="flex items-center gap-4 max-w-full">
                        <a href="#" className="text-pink-600 hover:text-pink-800">
                            <FaInstagram size={32} />
                        </a>
                        <span className="text-gray-700 bg-gray-50 w-64 px-2 py-1 rounded">Instagram Link</span>
                    </div>
                    <div className="flex items-center gap-4 max-w-full">
                        <a href="#" className="text-indigo-600 hover:text-indigo-800">
                            <FaDiscord size={32} />
                        </a>
                        <span className="text-gray-700 bg-gray-50 w-64 px-2 py-1 rounded">Discord Link</span>
                    </div>
                </div>
            </div>

            {/* Avatar Modal */}
            <Modal
                isOpen={isAvatarOpen}
                onRequestClose={() => setIsAvatarOpen(false)}
                className="bg-white p-8 rounded-lg shadow-lg w-[500px] max-w-lg mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-xl font-semibold text-center">Avatar</h2>
                <div className="mt-4 flex flex-col items-center">
                    {/* Avatar Large Image */}
                    <img src={image} alt="Profile" className="w-64 h-64 object-cover rounded-full border" />
                    
                    {/* Upload */}
                    <label className="mt-8 px-4 py-2 bg-green-700 text-white rounded cursor-pointer">
                        Upload
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
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
                <label htmlFor="username" className="text-sm font-medium text-gray-700">UserName</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={editUser.name} // Assuming you're storing the username in `editUser.name`
                    onChange={(e) => handleChange(e)}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your username"
                />
                </div>

                {/* About */}
                <div className="mb-4 w-full">
                <label htmlFor="about" className="text-sm font-medium text-gray-700">About Me</label>
                <textarea
                    id="about"
                    name="about"
                    value={editUser.about} // Assuming you're storing the "About Me" in `editUser.about`
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
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={editUser.phone} 
                        onChange={(e) => handleChange(e)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your phone number"
                    />
                    </div>

                    {/* Facebook */}
                    <div className="mb-4 w-full">
                    <label htmlFor="facebook" className="text-sm font-medium text-gray-700">Facebook</label>
                    <input
                        type="text"
                        id="facebook"
                        name="facebook"
                        value={editUser.facebook} // Assuming you're storing Facebook in `editDetails.facebook`
                        onChange={(e) => handleChange(e)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your Facebook username"
                    />
                    </div>
                    
                    {/* Instagram */}
                    <div className="mb-4 w-full">
                    <label htmlFor="instagram" className="text-sm font-medium text-gray-700">Instagram</label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={editUser.instagram} 
                        onChange={(e) => handleChange(e)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your Instagram username"
                    />
                    </div>

                    {/* Discord */}
                    <div className="mb-4 w-full">
                    <label htmlFor="discord" className="text-sm font-medium text-gray-700">Discord</label>
                    <input
                        type="text"
                        id="discord"
                        name="discord"
                        value={editUser.discord} 
                        onChange={(e) => handleChange(e)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your Discord username"
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
