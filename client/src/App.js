import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GetStart from './components/questionnaire/GetStart'
import Question from './components/questionnaire/Question'
import QuestionEnd from './components/questionnaire/QuestionEnd'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      dbResponse: ""
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

  render() {
    return (
      <Router>
            <Routes>
                <Route path="/" element={<GetStart/>} />
                <Route path="/question" element={<Question/>} />
                <Route path="/questionend" element={<QuestionEnd/>} />
            </Routes>
        </Router>
    );
  }
}

export default App;
