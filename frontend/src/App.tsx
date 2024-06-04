import React from "react";
import LandingPage from "./pages/LandingPage";
import ProfileSetting from "./pages/ProfileSetting";
import Dashboard from "./pages/Dashboard";
import SearchBar from "./pages/SearchBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountSetting from "./pages/AccountSetting";
import HighlightSetting from "./pages/HighlightSetting";
import NotificationPage from "./pages/NotificationPage";
import GalleryPage from "./pages/GalleryPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile_setting" element={<ProfileSetting />} />
          <Route path="/account_setting" element={<AccountSetting />} />
          <Route path="/highlight_setting" element={<HighlightSetting />} />
          <Route path="/search_photographer" element={<SearchBar />} />
          <Route path="/notification_page" element={<NotificationPage />} />
          <Route path="/gallery_page" element={<GalleryPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
