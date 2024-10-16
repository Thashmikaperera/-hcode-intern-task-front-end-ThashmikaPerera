import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from "./components/sign-up/sign-up";
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import SignIn from './components/login/login';
import Workout from './components/workout/workout';
import Profile from './components/profile/profile';
import Progress from './components/process/progress';

function App() {
  return (
    <Router>
      <div className='overflow-x-hidden bg-white2 text-dark'>
        <Routes>
          {/* Redirect from "/" to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login route */}
          <Route path="/login" element={<SignIn />} />

          {/* Navbar and Home are always shown after login */}
          <Route path="/home" element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          
          {/* Add the Workout route */}
          <Route path="/workout" element={
            <>
              <Navbar />
              <Workout /> {/* Render the Workout component */}
            </>
          } />
          
           {/* Add the Workout route */}
           <Route path="/progress" element={
            <>
              <Navbar />
              <Progress /> {/* Render the Workout component */}
            </>
          } />

           {/* Add the Workout route */}
           <Route path="/profile" element={
            <>
              <Navbar />
              <Profile /> {/* Render the Workout component */}
            </>
          } />

          {/* Sign Up route */}
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;