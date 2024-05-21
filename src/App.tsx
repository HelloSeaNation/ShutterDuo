import React from "react";
import LandingPage from "./pages/LandingPage";
import ProfileSetting from "./pages/ProfileSetting";
import Dashboard from "./pages/Dashboard";
import SearchBar from "./pages/SearchBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountSetting from "./pages/AccountSetting";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile_setting" element={<ProfileSetting />} />
          <Route path="/account_setting" element={<AccountSetting />} />
          <Route path="/search_photographer" element={<SearchBar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
