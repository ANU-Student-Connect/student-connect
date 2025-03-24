import React, { useState,useEffect } from "react";
import { FaFacebook, FaInstagram, FaDiscord, FaCamera } from "react-icons/fa";
import DefaultAvater from "../../assets/pic/defaultavater.png"

const UserProfile = () =>{

    //this is temporary user data, it'll be replaced with API data later.
    const [user,setUser] = useState({
        avatar: DefaultAvater,
        name: "ANU",
        email: "ANU@anu.edu.au",
        facebook: " "
    });

    const [isEditing, setIsEditing] = useState(false);  // whether the profile is in editing mode
    const [editUser, setEditUser] = useState(user); // stores the modified user info when editing
    //const [loading, setLoading] = useState(true);   // whether the data is still being fetched
    const [error, setError] = useState(null);  // holds any error messages

    // triggered when a field value change
    const handleChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    // save changes
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
          {/* 用户头像和基本信息 */}
          <div className="mt-6 flex items-center space-x-12 pb-4 border-b border-gray-300">
            <div className="relative w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                <FaCamera className="absolute text-gray-600 cursor-pointer" size={40} />
            </div>
            <div>
                <h1 className="text-2xl font-semibold">Anil</h1> 
                <p className="text-sm text-gray-500 mt-6">SC ID: 9087123231</p> 
                <span className="text-green-600 text-sm mt-4">● Active</span>
            </div>
          </div>
      
          {/* 用户详细信息 */}
          <div className="mt-6 pb-4 border-b border-gray-300 flex-grow">
            <div className="grid grid-cols-3 gap-8">
                <div className="flex items-center gap-4 max-w-full">
                    <span className="font-medium">UID:</span>
                    <span className="text-gray-700 bg-gray-200 w-64 px-2 py-1 rounded">u7708986</span>
                </div>
                <div className="flex items-center gap-4 max-w-full">
                    <span className="font-medium">Email:</span>
                    <span className="text-gray-700 bg-gray-200 w-64 px-2 py-1 rounded">u7708986@anu.edu.au</span>
                </div>
                <div className="flex items-center gap-4 max-w-full">
                    <span className="font-medium">Phone:</span>
                    <span className="text-gray-700 bg-gray-200 w-64 px-2 py-1 rounded">0448098231</span>
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

          <div className="mt-6 flex justify-center pt-4 border-gray-300 space-x-24">
            <button className="bg-red-500 text-white w-48 h-12 rounded">Edit</button>
            <button className="bg-green-500 text-white w-48 h-12 rounded">Back</button>
          </div>
        </div>
      );
      
};

export default UserProfile;