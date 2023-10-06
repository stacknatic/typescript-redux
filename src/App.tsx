import React from 'react';
import './App.css';
import CustomButton from './components/CustomButton/CustomButton';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import About from "./pages/About";
import Users from './components/Users/Users';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/about" element={<About />} />
      <Route path="/users" element={<Users />} />


    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
