//import React, {Component} from 'react';
//import logo from './logo.svg';
//import './App.css';
//
//class App extends Component {
//  constructor(props) {
//    super(props);
//    this.state = {
//      apiResponse: "",
//      dbResponse: ""
//    };
//  }
//
//  callAPI() {
//    fetch("http://localhost:9000/testAPI")
//      .then(res => res.text())
//      .then(res => this.setState({ apiResponse: res }))
//      .catch(err => err);
//  }
//
//  callDB() {
//    fetch("http://localhost:9000/testDB")
//        .then(res => res.text())
//        .then(res => this.setState({ dbResponse: res }))
//        .catch(err => err);
//  }
//
//  componentDidMount() {
//    this.callAPI();
//    this.callDB()
//  }
//
//  render() {
//    return (
//      <div className="App">
//        <header className="App-header">
//          <img src={logo} className="App-logo" alt="logo" />
//          <h1 className="App-title">Welcome to Student Connect</h1>
//        </header>
//        <p className="App-intro">{this.state.apiResponse}</p>
//        <p className="App-intro">{this.state.dbResponse}</p>
//      </div>
//    );
//  }
//}
//
//import React from 'react';
//import './App.css';  // 引入样式
//
//function App() {
//  return (
//    <div className="login-page">
//      <div className="form-container">
//        <h1>ANU STUDENT CONNECT</h1>
//        <h2>Sign In</h2>
//        <form>
//          <label>Username</label>
//          <input type="email" placeholder="example@email.com" />
//
//          <label>Password</label>
//          <div className="password-container">
//            <input type="password" placeholder="********" />
//            <span className="show-password">👁️</span>
//          </div>
//
//          <a href="#">Forgot password?</a>
//          <button type="submit">Sign In</button>
//        </form>
//        <p>Don’t have an account? <a href="#">Sign Up</a></p>
//      </div>
//
//      <div className="welcome-container">
//        <h1>Welcome to Student Connect Family!</h1>
//        <img src="your-image-path" alt="Students sitting together" />
//      </div>
//    </div>
//  );
//}
//
//
//
//export default App;

// import React, {Component} from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       apiResponse: "",
//       dbResponse: ""
//     };
//   }

//   callAPI() {
//     fetch("http://localhost:9000/testAPI")
//       .then(res => res.text())
//       .then(res => this.setState({ apiResponse: res }))
//       .catch(err => err);
//   }

//   callDB() {
//     fetch("http://localhost:9000/testDB")
//         .then(res => res.text())
//         .then(res => this.setState({ dbResponse: res }))
//         .catch(err => err);
//   }

//   componentDidMount() {
//     this.callAPI();
//     this.callDB()
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to Student Connect</h1>
//         </header>
//         <p className="App-intro">{this.state.apiResponse}</p>
//         <p className="App-intro">{this.state.dbResponse}</p>
//       </div>
//     );
//   }
// }

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterView from './views/register/register'
import LoginView from './views/login/login'

function App() {
  return (
    <div className="app-page">
      <Routes>
        <Route path='/' element={ <Navigate to="/login"></Navigate>}>
        </Route>
        <Route path='/register' element={<RegisterView></RegisterView>}>
        </Route>
        <Route path='/login' element={<LoginView></LoginView>}>
        </Route>
      </Routes>
    </div>
  );
}



export default App;
