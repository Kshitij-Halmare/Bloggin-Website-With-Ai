import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Component/Layout';
import Home from './Pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index  element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
