import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Filter, MessageCircle } from 'lucide-react';
import TopBar from "../../components/basic/TopBar";


const usersBase = [
  { name: 'Simon Norina', degree: 'Bachelor of IT', description: 'Passionate about tech and gaming.', interests: ['Cybersecurity'], sports: ['Badminton'], year: 'Second Year' },
  { name: 'Sid Dilova', degree: 'Bachelor of Commerce', description: 'Exploring finance and startups.', interests: ['Investing'], sports: ['Tennis'], year: 'Third Year' },
  { name: 'Kyriakos Vipin', degree: 'Bachelor of Arts', description: 'Creative mind with love for writing.', interests: ['Philosophy'], sports: ['Soccer'], year: 'First Year' },
  { name: 'Alice Green', degree: 'Bachelor of Science', description: 'Nature lover and coder.', interests: ['Hiking'], sports: ['Running'], year: 'Final Year' },
  { name: 'Bob Lee', degree: 'Bachelor of Engineering', description: 'Tech enthusiast and gamer.', interests: ['Robotics'], sports: ['Basketball'], year: 'Second Year' },
  { name: 'Carol Wu', degree: 'Bachelor of Design', description: 'Creative designer and artist.', interests: ['Painting'], sports: ['Yoga'], year: 'Third Year' },
  { name: 'David Smith', degree: 'Bachelor of Law', description: 'Passionate about justice.', interests: ['Debate'], sports: ['Football'], year: 'First Year' },
  { name: 'Eva Johnson', degree: 'Bachelor of Music', description: 'Loves melodies and concerts.', interests: ['Piano'], sports: ['Dance'], year: 'Final Year' },
  { name: 'Frank Liu', degree: 'Bachelor of IT', description: 'Coding and gaming everyday.', interests: ['Game Dev'], sports: ['Table Tennis'], year: 'Second Year' },
  { name: 'Grace Kim', degree: 'Bachelor of Commerce', description: 'Marketing and business enthusiast.', interests: ['Startups'], sports: ['Swimming'], year: 'Third Year' },
];


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


const StudentCard = ({ user }) => (
  <div className="bg-white shadow-md rounded-lg p-4 w-64 m-2 border border-gray-100">
    <div className="flex items-center mb-3">
      <img
        src={user.avatar_url || "/api/placeholder/50/50"}
        alt={user.name}
        className="w-12 h-12 rounded-full mr-3"
      />
      <div>
        <h3 className="font-bold text-sm">{user.name}</h3>
        <p className="text-xs text-gray-500">{user.degree}</p>
      </div>
    </div>
    <p className="text-xs text-gray-600 mb-3">{user.description}</p>
    <div className="flex items-center text-xs text-gray-500 mb-2">
      <MessageCircle className="w-4 h-4 mr-2" />
      {user.interests.map((interest, index) => (
        <span key={index} className="mr-1">{interest}</span>
      ))}
    </div>
    <div className="flex items-center text-xs text-gray-500">
      <Filter className="w-4 h-4 mr-2" />
      {user.sports.map((sport, index) => (
        <span key={index} className="mr-1">{sport}</span>
      ))}
      <span className="ml-auto text-xs">{user.year}</span>
    </div>
  </div>
);

const Home = () => {
  const [recommendUsers, setRecommendUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);

  useEffect(() => {
    const assignAvatarsAndPickUsers = async () => {
      const avatars = await fetchAvatarPool();
      const shuffledUsers = [...usersBase].sort(() => 0.5 - Math.random());
      const pickedUsers = shuffledUsers.slice(0, 8); // pick 8 total

      // Randomly assign avatar to each picked user
      const usersWithAvatars = pickedUsers.map(user => {
        const randomAvatar = avatars.length > 0
          ? avatars[Math.floor(Math.random() * avatars.length)]
          : null;
        return { ...user, avatar_url: randomAvatar };
      });

      setRecommendUsers(usersWithAvatars.slice(0, 4));
      setFilterUsers(usersWithAvatars.slice(4, 8));
    };

    assignAvatarsAndPickUsers();
  }, []);


  return (
  <div className="w-full h-full min-h-screen bg-white shadow-lg rounded-lg flex flex-col">
    <TopBar currentPage="userprofile" />
    <div className="p-6">
      
      {/* Recommendations Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <div className="grid grid-cols-4 gap-4">
          {recommendUsers.map((user, index) => (
            <StudentCard key={`rec-${index}`} user={user} />
          ))}
        </div>
      </div>

      {/* Search with Filter Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Search with filter</h2>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-4">
          <button className="bg-white border rounded-full px-3 py-1 text-xs">Video games</button>
          <button className="bg-white border rounded-full px-3 py-1 text-xs">Movies</button>
          <button className="bg-white border rounded-full px-3 py-1 text-xs">Travel</button>
          <button className="bg-white border rounded-full px-3 py-1 text-xs">Art</button>
        </div>

        {/* Filter User Cards */}
        <div className="grid grid-cols-4 gap-4">
          {filterUsers.map((user, index) => (
            <StudentCard key={`filter-${index}`} user={user} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

};

export default Home;
