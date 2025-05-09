import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Component/Layout';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index  element={<Home />} />
        <Route path="signin" element={<Signin/>}></Route>
        <Route path="signup" element={<Signup/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
