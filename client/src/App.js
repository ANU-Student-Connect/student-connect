import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GetStart from './components/questionnaire/GetStart'
import Question from './components/questionnaire/Question'
import QuestionEnd from './components/questionnaire/QuestionEnd'
import './App.css';
import Header from './MessageComponent/Header';
import Sidebar from './MessageComponent/Sidebar';
import ChatWindow from './MessageComponent/ChatWindow';
import UserProfile from './MessageComponent/UserProfile';
import defaultavater from './Assert/pic/defaultavater.png'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      dbResponse: "",
      isProfileOpen: false,
      currentPage: 'messages',
      selectedFriend: null,
      friends: [
        {
          id: 1,
          name: 'Anil',
          status: 'April fool\'s day',
          time: 'Today, 9:52pm',
          avatar: defaultavater,
          messageStatus: 'read',
          unreadCount: 0,
          lastReplyTime: 'Today, 10:30pm',
          messages: [
            { id: 1, text: "Hey, how's it going?", sent: true },
            { id: 2, text: "Not bad, you?", sent: false },
          ]
        },
        {
          id: 2,
          name: 'Friends Forever',
          status: 'Hahahaha!',
          time: 'Today, 9:52pm',
          avatar: defaultavater,
          messageStatus: 'unread',
          unreadCount: 4,
          lastReplyTime: 'Today, 9:52pm',
          messages: [
            { id: 1, text: "Movie night tonight?", sent: false },
            { id: 2, text: "Sounds great!", sent: true },
          ]
        },
        // Add more friends as needed
      ]
    };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  callDB() {
    fetch("http://localhost:9000/testDB")
        .then(res => res.text())
        .then(res => this.setState({ dbResponse: res }))
        .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
    this.callDB()
  }

  toggleProfile = () => {
    this.setState(prevState => ({ isProfileOpen: !prevState.isProfileOpen }));
  }

  handleFriendSelect = (friendId) => {
    const selectedFriend = this.state.friends.find(friend => friend.id === friendId);
    this.setState({ selectedFriend });
  }

  render() {
    return (
      <>
        <div className="flex flex-col h-screen">
          <Header currentPage={this.state.currentPage} />
          <div className="flex-1 flex overflow-hidden">
            <Sidebar
              friends={this.state.friends}
              onFriendSelect={this.handleFriendSelect}
            />
            <main className="flex-1 flex">
              <ChatWindow
                onToggleProfile={this.toggleProfile}
                isProfileOpen={this.state.isProfileOpen}
                selectedFriend={this.state.selectedFriend}
              />
              <UserProfile isOpen={this.state.isProfileOpen} />
            </main>
          </div>
          {/* API and DB responses */}
          <div className="p-4 bg-gray-100">
            <p className="text-sm">{this.state.apiResponse}</p>
            <p className="text-sm">{this.state.dbResponse}</p>
          </div>
        </div>
        
        <Router>
          <Routes>
            <Route path="/" element={<GetStart />} />
            <Route path="/question" element={<Question />} />
            <Route path="/questionend" element={<QuestionEnd />} />
          </Routes>
        </Router>
      </>
    );
}
}

export default App;
