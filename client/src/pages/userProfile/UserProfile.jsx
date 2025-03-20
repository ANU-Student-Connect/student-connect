import React, { useState,useEffect } from "react";

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
    const [loading, setLoading] = useState(true);   // whether the data is still being fetched
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

    
    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div>Hello World</div>
    );

};

export default UserProfile;