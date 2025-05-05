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
  { name: "Football", img: Sports_u, imgSelected: Sports_s },
  { name: "Tennis", img: Sports_u, imgSelected: Sports_s },
  { name: "Golf", img: Sports_u, imgSelected: Sports_s },
  { name: "Swimming", img: Sports_u, imgSelected: Sports_s },
  { name: "Yoga", img: Sports_u, imgSelected: Sports_s },
  { name: "Soccer", img: Sports_u, imgSelected: Sports_s },
  { name: "Cycling", img: Sports_u, imgSelected: Sports_s },
  { name: "Volleyball", img: Sports_u, imgSelected: Sports_s },
];

// Define the sub set of Art & Music
const artMusicSubCategories = [
  { name: "Painting", img: Art_Music_u, imgSelected: Art_Music_s },
  { name: "Guitar", img: Art_Music_u, imgSelected: Art_Music_s },
  { name: "Singing", img: Art_Music_u, imgSelected: Art_Music_s },
  { name: "Drawing", img: Art_Music_u, imgSelected: Art_Music_s },
  { name: "Drums", img: Art_Music_u, imgSelected: Art_Music_s },
  { name: "Dance", img: Art_Music_u, imgSelected: Art_Music_s },
  { name: "Piano", img: Art_Music_u, imgSelected: Art_Music_s },
  { name: "Photography", img: Art_Music_u, imgSelected: Art_Music_s },
  { name: "Sculpture", img: Art_Music_u, imgSelected: Art_Music_s },
];

// Define the sub set of Movies
const moviesSubCategories = [
  { name: "Action", img: Movie_u, imgSelected: Movie_s },
  { name: "Comedy", img: Movie_u, imgSelected: Movie_s },
  { name: "Drama", img: Movie_u, imgSelected: Movie_s },
  { name: "Science Fiction", img: Movie_u, imgSelected: Movie_s },
  { name: "Fantasy", img: Movie_u, imgSelected: Movie_s },
  { name: "Horror", img: Movie_u, imgSelected: Movie_s },
  { name: "Animated", img: Movie_u, imgSelected: Movie_s },
  { name: "Documentary", img: Movie_u, imgSelected: Movie_s },
  { name: "Thriller", img: Movie_u, imgSelected: Movie_s },
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
  { name: "Italian Cuisine", img: Food_u, imgSelected: Food_s },
  { name: "Chinese Cuisine", img: Food_u, imgSelected: Food_s },
  { name: "Mexican Cuisine", img: Food_u, imgSelected: Food_s },
  { name: "Japanese Cuisine", img: Food_u, imgSelected: Food_s },
  { name: "Fast Food", img: Food_u, imgSelected: Food_s },
  { name: "Healthy Food", img: Food_u, imgSelected: Food_s },
  { name: "Desserts", img: Food_u, imgSelected: Food_s },
  { name: "Beverages", img: Food_u, imgSelected: Food_s },
  { name: "Mediterranean Cuisine", img: Food_u, imgSelected: Food_s },
];

// Define the sub set of Others
const othersSubCategories = [
  { name: "Hobbies", img: Others_u, imgSelected: Others_s },
  { name: "Collectibles", img: Others_u, imgSelected: Others_s },
  { name: "Pet Care", img: Others_u, imgSelected: Others_s },
  { name: "Office", img: Others_u, imgSelected: Others_s },
  { name: "Home Improvement", img: Others_u, imgSelected: Others_s },
  { name: "Stationery", img: Others_u, imgSelected: Others_s },
  { name: "Tools", img: Others_u, imgSelected: Others_s },
  { name: "Party", img: Others_u, imgSelected: Others_s },
  { name: "Gardening", img: Others_u, imgSelected: Others_s },
];    

// Define the first set of categories
const categories = [
  { name: "Electronics", img: Electronics_u, imgSelected: Electronics_s, subCategories: categories_next },
  { name: "Sports", img: Sports_u, imgSelected: Sports_s, subCategories: sportsSubCategories },
  { name: "Art & Music", img: Art_Music_u, imgSelected: Art_Music_s, subCategories: artMusicSubCategories },
  { name: "Movies", img: Movie_u, imgSelected: Movie_s, subCategories: moviesSubCategories },
  { name: "Travel", img: Travel_u, imgSelected: Travel_s, subCategories: travelSubCategories },
  { name: "Reading", img: Reading_u, imgSelected: Reading_s, subCategories: readingSubCategories },
  { name: "Health", img: Health_u, imgSelected: Health_s, subCategories: healthSubCategories },
  { name: "Food", img: Food_u, imgSelected: Food_s, subCategories: foodSubCategories },
  { name: "Others", img: Others_u, imgSelected: Others_s, subCategories: othersSubCategories },
];

// 确保categories_next在使用之前被定义
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
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i!== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
      // 记录选择的主分类
      if (!showCategoriesNext) {
        setSelectedMainCategory(categories[index]);
      }
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


/*
// 生成Sports的子类
const sportsSubCategories = [
  { name: "Basketball Gear", img: BasketballGear_u, imgSelected: BasketballGear_s },
  { name: "Running Shoes", img: RunningShoes_u, imgSelected: RunningShoes_s },
  { name: "Tennis Equipment", img: TennisEquipment_u, imgSelected: TennisEquipment_s },
  { name: "Golf Accessories", img: GolfAccessories_u, imgSelected: GolfAccessories_s },
  { name: "Swimming Gear", img: SwimmingGear_u, imgSelected: SwimmingGear_s },
  { name: "Yoga Props", img: YogaProps_u, imgSelected: YogaProps_s },
  { name: "Soccer Apparel", img: SoccerApparel_u, imgSelected: SoccerApparel_s },
  { name: "Cycling Bikes", img: CyclingBikes_u, imgSelected: CyclingBikes_s }
];

// 生成Art & Music的子类
const artMusicSubCategories = [
  { name: "Paintbrushes & Palettes", img: Paintbrushes_u, imgSelected: Paintbrushes_s },
  { name: "Guitar Strings", img: GuitarStrings_u, imgSelected: GuitarStrings_s },
  { name: "Sheet Music", img: SheetMusic_u, imgSelected: SheetMusic_s },
  { name: "Canvas", img: Canvas_u, imgSelected: Canvas_s },
  { name: "Drumsticks", img: Drumsticks_u, imgSelected: Drumsticks_s },
  { name: "Easel", img: Easel_u, imgSelected: Easel_s },
  { name: "Violin Bows", img: ViolinBows_u, imgSelected: ViolinBows_s },
  { name: "Art Prints", img: ArtPrints_u, imgSelected: ArtPrints_s }
];

// 生成Movies的子类
const moviesSubCategories = [
  { name: "Action Movies", img: ActionMovies_u, imgSelected: ActionMovies_s },
  { name: "Comedy Movies", img: ComedyMovies_u, imgSelected: ComedyMovies_s },
  { name: "Drama Movies", img: DramaMovies_u, imgSelected: DramaMovies_s },
  { name: "Science Fiction Movies", img: ScienceFictionMovies_u, imgSelected: ScienceFictionMovies_s },
  { name: "Fantasy Movies", img: FantasyMovies_u, imgSelected: FantasyMovies_s },
  { name: "Horror Movies", img: HorrorMovies_u, imgSelected: HorrorMovies_s },
  { name: "Animated Movies", img: AnimatedMovies_u, imgSelected: AnimatedMovies_s },
  { name: "Documentary Movies", img: DocumentaryMovies_u, imgSelected: DocumentaryMovies_s }
];

// 生成Travel的子类
const travelSubCategories = [
  { name: "Backpacks", img: Backpacks_u, imgSelected: Backpacks_s },
  { name: "Travel Guides", img: TravelGuides_u, imgSelected: TravelGuides_s },
  { name: "Luggage", img: Luggage_u, imgSelected: Luggage_s },
  { name: "Passport Holders", img: PassportHolders_u, imgSelected: PassportHolders_s },
  { name: "Travel Cameras", img: TravelCameras_u, imgSelected: TravelCameras_s },
  { name: "Airplane Accessories", img: AirplaneAccessories_u, imgSelected: AirplaneAccessories_s },
  { name: "Travel Maps", img: TravelMaps_u, imgSelected: TravelMaps_s },
  { name: "Souvenirs", img: Souvenirs_u, imgSelected: Souvenirs_s }
];

// 生成Reading的子类
const readingSubCategories = [
  { name: "Fiction Books", img: FictionBooks_u, imgSelected: FictionBooks_s },
  { name: "Non - Fiction Books", img: NonFictionBooks_u, imgSelected: NonFictionBooks_s },
  { name: "Manga", img: Manga_u, imgSelected: Manga_s },
  { name: "Graphic Novels", img: GraphicNovels_u, imgSelected: GraphicNovels_s },
  { name: "Textbooks", img: Textbooks_u, imgSelected: Textbooks_s },
  { name: "E - Readers", img: EReaders_u, imgSelected: EReaders_s },
  { name: "Bookmarks", img: Bookmarks_u, imgSelected: Bookmarks_s },
  { name: "Reading Lights", img: ReadingLights_u, imgSelected: ReadingLights_s }
];

// 生成Health的子类
const healthSubCategories = [
  { name: "Fitness Equipment", img: FitnessEquipment_u, imgSelected: FitnessEquipment_s },
  { name: "Vitamins & Supplements", img: Vitamins_u, imgSelected: Vitamins_s },
  { name: "Yoga Mats", img: YogaMats_u, imgSelected: YogaMats_s },
  { name: "Massage Tools", img: MassageTools_u, imgSelected: MassageTools_s },
  { name: "First Aid Kits", img: FirstAidKits_u, imgSelected: FirstAidKits_s },
  { name: "Health Trackers", img: HealthTrackers_u, imgSelected: HealthTrackers_s },
  { name: "Sports Bras", img: SportsBras_u, imgSelected: SportsBras_s },
  { name: "Water Bottles", img: WaterBottles_u, imgSelected: WaterBottles_s }
];

// 生成Food的子类
const foodSubCategories = [
  { name: "Bakery Items", img: BakeryItems_u, imgSelected: BakeryItems_s },
  { name: "Fruits", img: Fruits_u, imgSelected: Fruits_s },
  { name: "Vegetables", img: Vegetables_u, imgSelected: Vegetables_s },
  { name: "Meat & Poultry", img: MeatPoultry_u, imgSelected: MeatPoultry_s },
  { name: "Dairy Products", img: DairyProducts_u, imgSelected: DairyProducts_s },
  { name: "Seafood", img: Seafood_u, imgSelected: Seafood_s },
  { name: "Snacks", img: Snacks_u, imgSelected: Snacks_s },
  { name: "Beverages", img: Beverages_u, imgSelected: Beverages_s }
];

// 生成Others的子类
const othersSubCategories = [
  { name: "Hobbies - DIY", img: HobbiesDIY_u, imgSelected: HobbiesDIY_s },
  { name: "Collectibles", img: Collectibles_u, imgSelected: Collectibles_s },
  { name: "Pet Supplies", img: PetSupplies_u, imgSelected: PetSupplies_s },
  { name: "Office Supplies", img: OfficeSupplies_u, imgSelected: OfficeSupplies_s },
  { name: "Home Decor", img: HomeDecor_u, imgSelected: HomeDecor_s },
  { name: "Stationery", img: Stationery_u, imgSelected: Stationery_s },
  { name: "Tools", img: Tools_u, imgSelected: Tools_s },
  { name: "Party Supplies", img: PartySupplies_u, imgSelected: PartySupplies_s }
];*/
