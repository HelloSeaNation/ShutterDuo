import React from "react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/profile_setting " element={<ProfileSetting />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
