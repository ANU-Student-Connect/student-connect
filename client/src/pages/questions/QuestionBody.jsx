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
import Football_u from "../../assets/icons/sports/football.png";
import Volleyball_u from "../../assets/icons/sports/volleyball.png";
import Baseball_u from "../../assets/icons/sports/baseball.png";
import Soccer_u from "../../assets/icons/sports/soccer.png";
import Tennis_u from "../../assets/icons/sports/tennis.png";
import Golf_u from "../../assets/icons/sports/golf.png";
import Swimming_u from "../../assets/icons/sports/swimming.png";
import Yoga_u from "../../assets/icons/sports/yoga.png";
import Violin_u from "../../assets/icons/art_music/violin.png";
import Guitar_u from "../../assets/icons/art_music/guitar.png";
import Singing_u from "../../assets/icons/art_music/singing.png";
import Drawing_u from "../../assets/icons/art_music/drawing.png";
import Saxophone_u from "../../assets/icons/art_music/saxophone.png";
import Dance_u from "../../assets/icons/art_music/dance.png";
import Piano_u from "../../assets/icons/art_music/piano.png";
import Photography_u from "../../assets/icons/art_music/photography.png";
import Sculpture_u from "../../assets/icons/art_music/sculpture.png";
import Movie_u1 from "../../assets/icons/category/Movie.png";
import Travel_u1 from "../../assets/icons/category/Travel.png";
import Reading_u1 from "../../assets/icons/category/BookTypes.png";
import Health_u1 from "../../assets/icons/category/Health.png";
import BakeryItems_u from "../../assets/icons/food/bakery.png";
import Fruits_u from "../../assets/icons/food/fruit.png";
import Vegetables_u from "../../assets/icons/food/vegetables.png";
import MeatPoultry_u from "../../assets/icons/food/meat.png";
import DairyProducts_u from "../../assets/icons/food/daliyproduct.png";
import Seafood_u from "../../assets/icons/food/seafood.png";
import Snacks_u from "../../assets/icons/food/snacks.png";
import Drinks_u from "../../assets/icons/food/drinks.png";
import Fastfood_u from "../../assets/icons/food/fastfood.png";
import HobbiesDIY_u from "../../assets/icons/others/hobbies.png";
import Collectibles_u from "../../assets/icons/others/collections.png";
import PetSupplies_u from "../../assets/icons/others/petcare.png";
import OfficeSupplies_u from "../../assets/icons/others/office.png";
import HomeDecor_u from "../../assets/icons/others/homeimp.png";
import Cars_u from "../../assets/icons/others/cars.png";
import Tools_u from "../../assets/icons/others/tools.png";
import PartySupplies_u from "../../assets/icons/others/party.png";
import Gardening_u from "../../assets/icons/others/gardening.png";


// Define the sub set of categories
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

// Define the sub set of Sports
const sportsSubCategories = [
  { name: "Basketball", img: Sports_u, imgSelected: Sports_s },
  { name: "Football", img: Football_u, imgSelected: Football_u },
  { name: "Tennis", img: Tennis_u, imgSelected: Tennis_u },
  { name: "Golf", img: Golf_u, imgSelected: Golf_u },
  { name: "Swimming", img: Swimming_u, imgSelected: Swimming_u },
  { name: "Yoga", img: Yoga_u, imgSelected: Yoga_u },
  { name: "Baseball", img: Baseball_u, imgSelected: Baseball_u },
  { name: "Soccer", img: Soccer_u, imgSelected: Soccer_u },
  { name: "Volleyball", img: Volleyball_u, imgSelected: Volleyball_u },
];

// Define the sub set of Art & Music
const artMusicSubCategories = [
  { name: "Violin", img: Violin_u, imgSelected: Violin_u },
  { name: "Guitar", img: Guitar_u, imgSelected: Guitar_u },
  { name: "Singing", img: Singing_u, imgSelected: Singing_u },
  { name: "Drawing", img: Drawing_u, imgSelected: Drawing_u },
  { name: "Saxophone", img: Saxophone_u, imgSelected: Saxophone_u },
  { name: "Dance", img: Dance_u, imgSelected: Dance_u },
  { name: "Piano", img: Piano_u, imgSelected: Piano_u },
  { name: "Photography", img: Photography_u, imgSelected: Photography_u },
  { name: "Sculpture", img: Sculpture_u, imgSelected: Sculpture_u },
];

// Define the sub set of Movies
const moviesSubCategories = [
  { name: "Action", img: Movie_u1, imgSelected: Movie_u1 },
  { name: "Comedy", img: Movie_u1, imgSelected: Movie_u1 },
  { name: "Drama", img: Movie_u1, imgSelected: Movie_u1 },
  { name: "Science Fiction", img: Movie_u1, imgSelected: Movie_u1 },
  { name: "Fantasy", img: Movie_u1, imgSelected: Movie_u1 },
  { name: "Horror", img: Movie_u1, imgSelected: Movie_u1 },
  { name: "Animated", img: Movie_u1, imgSelected: Movie_u1 },
  { name: "Documentary", img: Movie_u1, imgSelected: Movie_u1 },
  { name: "Thriller", img: Movie_u1, imgSelected: Movie_u1 },
];

// Define the sub set of Travel
const travelSubCategories = [
  { name: "Beach Travel", img: Travel_u, imgSelected: Travel_s },
  { name: "Mountain Travel", img: Travel_u, imgSelected: Travel_s },
  { name: "City Travel", img: Travel_u, imgSelected: Travel_s },
  { name: "Road Trip", img: Travel_u, imgSelected: Travel_s },
  { name: "Cruise", img: Travel_u, imgSelected: Travel_s },
  { name: "Backpacking", img: Travel_u, imgSelected: Travel_s },
  { name: "Solo Travel", img: Travel_u, imgSelected: Travel_s },
  { name: "Group Travel", img: Travel_u, imgSelected: Travel_s },
  { name: "Camping Travel", img: Travel_u, imgSelected: Travel_s },
];

// Define the sub set of Reading
const readingSubCategories = [
  { name: "Fiction", img: Reading_u, imgSelected: Reading_s },
  { name: "Non - Fiction", img: Reading_u, imgSelected: Reading_s },
  { name: "Mystery", img: Reading_u, imgSelected: Reading_s },
  { name: "Romance", img: Reading_u, imgSelected: Reading_s },
  { name: "Science Fiction Literature", img: Reading_u, imgSelected: Reading_s },
  { name: "Biography", img: Reading_u, imgSelected: Reading_s },
  { name: "Poetry", img: Reading_u, imgSelected: Reading_s },
  { name: "Self - Help", img: Reading_u, imgSelected: Reading_s },
  { name: "History", img: Reading_u, imgSelected: Reading_s },
];

// Define the sub set of Health
const healthSubCategories = [
  { name: "Fitness", img: Health_u, imgSelected: Health_s },
  { name: "Nutrition", img: Health_u, imgSelected: Health_s },
  { name: "Mental Health", img: Health_u, imgSelected: Health_s },
  { name: "Wellness", img: Health_u, imgSelected: Health_s },
  { name: "Alternative Medicine", img: Health_u, imgSelected: Health_s },
  { name: "Sports Medicine", img: Health_u, imgSelected: Health_s },
  { name: "Preventive Health", img: Health_u, imgSelected: Health_s },
  { name: "Healthy Living", img: Health_u, imgSelected: Health_s },
  { name: "Sleep Health", img: Health_u, imgSelected: Health_s },
];

// Define the sub set of Food
const foodSubCategories = [
  { name: "Bakery Items", img: BakeryItems_u, imgSelected: BakeryItems_u },
  { name: "Fruits", img: Fruits_u, imgSelected: Fruits_u },
  { name: "Vegetables", img: Vegetables_u, imgSelected: Vegetables_u },
  { name: "Meat & Poultry", img: MeatPoultry_u, imgSelected: MeatPoultry_u },
  { name: "Daliy Products", img: DairyProducts_u, imgSelected: DairyProducts_u },
  { name: "Seafood", img: Seafood_u, imgSelected: Seafood_u },
  { name: "Snacks", img: Snacks_u, imgSelected: Snacks_u },
  { name: "Drinks", img: Drinks_u, imgSelected: Drinks_u },
  { name: "Fast Food", img: Fastfood_u, imgSelected: Fastfood_u },
];

// Define the sub set of Others
const othersSubCategories = [
  { name: "Hobbies", img: HobbiesDIY_u, imgSelected: HobbiesDIY_u },
  { name: "Collectionss", img: Collectibles_u, imgSelected: Collectibles_u },
  { name: "Pet Care", img: PetSupplies_u, imgSelected: PetSupplies_u },
  { name: "Office", img: OfficeSupplies_u, imgSelected: OfficeSupplies_u },
  { name: "Home Improvement", img: HomeDecor_u, imgSelected: HomeDecor_u },
  { name: "Cars", img: Cars_u, imgSelected: Cars_u },
  { name: "Tools", img: Tools_u, imgSelected: Tools_u },
  { name: "Party", img: PartySupplies_u, imgSelected: PartySupplies_u },
  { name: "Gardening", img: Gardening_u, imgSelected: Gardening_u },
];

// Define the first set of categories
const categories = [
  { name: "Electronics", img: Electronics_u, imgSelected: Electronics_s, subCategories: categories_next },
  { name: "Sports", img: Sports_u, imgSelected: Sports_s, subCategories: sportsSubCategories },
  { name: "Art & Music", img: Art_Music_u, imgSelected: Art_Music_s, subCategories: artMusicSubCategories },
  { name: "Movies", img: Movie_u, imgSelected: Movie_s, subCategories: moviesSubCategories },
  { name: "Travel", img: Travel_u1, imgSelected: Travel_u1, subCategories: travelSubCategories },
  { name: "Reading", img: Reading_u1, imgSelected: Reading_u1, subCategories: readingSubCategories },
  { name: "Health", img: Health_u1, imgSelected: Health_u1, subCategories: healthSubCategories },
  { name: "Food", img: Food_u, imgSelected: Food_s, subCategories: foodSubCategories },
  { name: "Others", img: Others_u, imgSelected: Others_s, subCategories: othersSubCategories },
];

// Define the Question component
const Question = () => {
  // State to store the indices of the selected categories
  const [selectedIndices, setSelectedIndices] = useState([]);
  // State to determine whether to show the next set of categories
  const [showCategoriesNext, setShowCategoriesNext] = useState(false);
  // State to store the currently selected main category
  const [selectedMainCategory, setSelectedMainCategory] = useState(null); 
  const navigate = useNavigate();

  // Function to handle the selection of a category
  const handleSelect = (index) => {
    // If the next set of categories is shown, set the selected index and clear the previous selection
    setSelectedIndices([index]); 
    // If the next set of categories is not shown, set the selected main category
    if (!showCategoriesNext) {
      setSelectedMainCategory(categories[index]);
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
      if (selectedMainCategory) {
        setShowCategoriesNext(true);
        setSelectedIndices([]);
      }
    }
  };

  // Function to handle the click of the left arrow button
  const handleLeftClick = () => {
    setShowCategoriesNext(false);
    setSelectedIndices([]);
    setSelectedMainCategory(null); 
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
             ? `Which area of ${selectedMainCategory?.name} interests you?`
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
              {showCategoriesNext && selectedMainCategory 
               ? selectedMainCategory.subCategories.map((category, index) => (
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
                  ))
                : categories.map((category, index) => (
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
                  ))}
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