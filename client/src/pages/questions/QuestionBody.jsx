// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import all the icon images
import Left from "../../assets/icons/left_question.png";
import Right from "../../assets/icons/right_question.png";
import Electronics_u from "../../assets/icons/category/earphone_b.png";
import Electronics_s from "../../assets/icons/category/earphone_w.png";
import Sports_u from "../../assets/icons/category/basketball_b.png";
import Sports_s from "../../assets/icons/category/basketball_w.png";
import Art_Music_u from "../../assets/icons/category/sandbox_b.png";
import Art_Music_s from "../../assets/icons/category/sandbox_w.png";
import Movie_u from "../../assets/icons/category/eye_b.png";
import Movie_s from "../../assets/icons/category/eye_w.png";
import Travel_u from "../../assets/icons/category/travel_b.png";
import Travel_s from "../../assets/icons/category/travel_w.png";
import Reading_u from "../../assets/icons/category/book_b.png";
import Reading_s from "../../assets/icons/category/book_w.png";
import Health_u from "../../assets/icons/category/heartbeat_b.png";
import Health_s from "../../assets/icons/category/heartbeat_w.png";
import Food_u from "../../assets/icons/category/hamburger_b.png";
import Food_s from "../../assets/icons/category/hamburger_w.png";
import Others_u from "../../assets/icons/category/others_b.png";
import Others_s from "../../assets/icons/category/others_w.png";
import Computer_u from "../../assets/icons/category/computer_b.png";
import Computer_s from "../../assets/icons/category/computer_w.png";
import Key_mouse_u from "../../assets/icons/category/keyboard_b.png";
import Key_mouse_s from "../../assets/icons/category/keyboard_w.png";
import Tablets_u from "../../assets/icons/category/tablet_b.png";
import Tablets_s from "../../assets/icons/category/tablet_w.png";
import Smart_speaker_u from "../../assets/icons/category/Smart_Speaker_b.png";
import Smart_speaker_s from "../../assets/icons/category/Smart_Speaker_w.png";
import Smart_watch_u from "../../assets/icons/category/smartwatch_b.png";
import Smart_watch_s from "../../assets/icons/category/smartwatch_w.png";
import Smart_phone_u from "../../assets/icons/category/smartphone_b.png";
import Smart_phone_s from "../../assets/icons/category/smartphone_w.png";
import Vr_u from "../../assets/icons/category/VR_b.png";
import Vr_s from "../../assets/icons/category/VR_w.png";
import Drone_u from "../../assets/icons/category/drone_b.png";
import Drone_s from "../../assets/icons/category/drone_w.png";
import Digital_camera_u from "../../assets/icons/category/camera_b.png";
import Digital_camera_s from "../../assets/icons/category/camera_w.png";

// Define the first set of categories
const categories = [
  { name: "Electronics", img: Electronics_u, imgSelected: Electronics_s },
  { name: "Sports", img: Sports_u, imgSelected: Sports_s },
  { name: "Art & Music", img: Art_Music_u, imgSelected: Art_Music_s },
  { name: "Movies", img: Movie_u, imgSelected: Movie_s },
  { name: "Travel", img: Travel_u, imgSelected: Travel_s },
  { name: "Reading", img: Reading_u, imgSelected: Reading_s },
  { name: "Health", img: Health_u, imgSelected: Health_s },
  { name: "Food", img: Food_u, imgSelected: Food_s },
  { name: "Others", img: Others_u, imgSelected: Others_s },
];

// Define the second set of categories
const categories_next = [
  { name: "Computer", img: Computer_u, imgSelected: Computer_s },
  { name: "Keyboard & Mouse", img: Key_mouse_u, imgSelected: Key_mouse_s },
  { name: "Tablets", img: Tablets_u, imgSelected: Tablets_s },
  { name: "Smart Speaker", img: Smart_speaker_u, imgSelected: Smart_speaker_s },
  { name: "Smart Watch", img: Smart_watch_u, imgSelected: Smart_watch_s },
  { name: "Smart Phone", img: Smart_phone_u, imgSelected: Smart_phone_s },
  { name: "VR", img: Vr_u, imgSelected: Vr_s },
  { name: "Drone", img: Drone_u, imgSelected: Drone_s },
  { name: "Digital Camera", img: Digital_camera_u, imgSelected: Digital_camera_s },
];

const Question = () => {
  // State to store the indices of the selected categories
  const [selectedIndices, setSelectedIndices] = useState([]);
  // State to determine whether to show the next set of categories
  const [showCategoriesNext, setShowCategoriesNext] = useState(false);
  const navigate = useNavigate();

  // Function to handle the selection of a category
  const handleSelect = (index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i!== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
      //handleLeftClick();
    }
  };

  // Function to handle the click of the right arrow button
  const handleRightClick = () => {
    // If the next set of categories is shown and there are selected indices, navigate to the QuestionEnd page
    if (showCategoriesNext && selectedIndices.length > 0) {
      try {
        navigate("/questionend");
      } catch (error) {
        console.error("Navigation error when going to questionend:", error);
      }
    } else {
      // Otherwise, proceed to show the next categories and clear the selection
      setShowCategoriesNext(true);
      setSelectedIndices([]);
    }
  };

  // Function to handle the click of the left arrow button
  const handleLeftClick = () => {
    setShowCategoriesNext(false);
    setSelectedIndices([]);
  };

  // Calculate the progress as a percentage
  const totalQuestions = 2; // This value should be adjusted according to the actual flow
  const currentQuestion = showCategoriesNext? 2 : 1;
  const progress = (currentQuestion / totalQuestions) * 100;

  // Define the style object for the main container to set background and size
  const containerStyle = {
    background: "linear-gradient(to right, #f0c2f0, #b3e5fc)",
    minHeight: "100vh",
    minWidth: "100vw",
  };

  return (
    <div className="flex flex-col h-screen questionnaire-bg" style={containerStyle}>
      <div className="text-right mr-5 mt-5">
        <h1 className="text-xl">
          <u onClick={handleRightClick} style={{ cursor: "pointer" }}>
            Skip
          </u>
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center mt-12 flex-grow">
        <div className="flex items-center mb-10">
          <h1 className="text-4xl">
            {showCategoriesNext
             ? "Which area of electronic products interests you?"
              : "Which areas are you interested in?"}
          </h1>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className={`col-span-3 flex items-center justify-center`}>
            <img
              src={Left}
              alt="Left"
              className={`cursor-pointer ${showCategoriesNext? "block" : "hidden"}`}
              onClick={handleLeftClick}
            />
          </div>
          <div className="col-span-6">
            <div className="grid grid-cols-12 gap-4">
              {(showCategoriesNext? categories_next : categories).map(
                (category, index) => (
                  <div className="col-span-4" key={index}>
                    <div
                      className={`w-52 h-32 rounded-lg shadow-lg flex flex-col items-center justify-center mb-3 cursor-pointer 
                          ${selectedIndices.includes(index)? "bg-[#2B7475] text-white" : "bg-white text-black"}`}
                      onClick={() => handleSelect(index)}
                    >
                      <img
                        src={selectedIndices.includes(index)? category.imgSelected : category.img}
                        alt={category.name}
                      />
                      <p>{category.name}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className={`col-span-3 flex items-center justify-center`}>
            <img
              src={Right}
              alt="Right"
              className={`cursor-pointer`}
              onClick={handleRightClick}
            />
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-gray-300 h-2 mb-0">
        <div
          className="h-full"
          style={{ width: `${progress}%`, backgroundColor: "#2B7475" }}
        />
      </div>
    </div>
  );
};

export default Question;