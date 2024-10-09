import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import QuestionStart from './pages/questions/QuestionStart'
import QuestionBody from './pages/questions/QuestionBody'
import QuestionEnd from './pages/questions/QuestionEnd'

import { Toaster } from 'react-hot-toast'
// import { useAuthContext } from './context/AuthContext'

function App() {
  // const { authUser } = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        {/* <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"}/> } />
        <Route path='/login' element={authUser ? <Navigate to = '/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} /> */}
        {/* <Route path="/questionstart" element={authUser ? <QuestionStart/> : <Navigate to={"/login"}/>}/>
        <Route path="/questionbody" element={authUser ? <QuestionBody/> : <Navigate to={"/login"}/>} />
        <Route path="/questionend" element={authUser ? <QuestionEnd/> : <Navigate to={"/login"}/>} /> */}
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/questionstart' element={<QuestionStart />} />
        <Route path='/questionbody' element={<QuestionBody />} />
        <Route path='/questionend' element={<QuestionEnd />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
