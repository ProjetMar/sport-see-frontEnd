import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/user/:id" element={<User/>}/>
        </Routes>
    </Router>
  </React.StrictMode>
);
