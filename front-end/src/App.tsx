import React from 'react';
import {
  BrowserRouter as RouterProvider,
  Routes,
  Route,
} from 'react-router-dom';

import './i18n';
import Navbar from 'pages/shared/navbar/navbar';
import ServicesAndMasters from 'pages/Services/ServicesAndMasters';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';


const App = () => {
  return (
    <>
     <Navbar/>
     <RouterProvider>
        <Routes>
          <Route path="/" >
            <Route path="/" index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<ServicesAndMasters />} />
          </Route>
        </Routes>
      </RouterProvider>

    </>
  );
};

export default App;