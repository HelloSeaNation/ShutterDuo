import React from "react";
import LandingPage from "./pages/LandingPage";
import ProfileSetting from "./pages/ProfileSetting";
import Dashboard from "./pages/Dashboard";
import SearchBar from "./pages/SearchBar";
import { BrowserRouter as HashRouter, Routes, Route } from "react-router-dom";
import AccountSetting from "./pages/AccountSetting";
import HighlightSetting from "./pages/HighlightSetting";
import NotificationPage from "./pages/NotificationPage";
import GalleryPage from "./pages/GalleryPage";
import GallerySettings from "./pages/GallerySettings"
import ProfilePage from "./pages/ProfileDisplay"
import Report from "./pages/ReportPage"
import SearchResults from "./pages/SearchResults"
import AlbumPage from "./pages/AlbumPage"

function App() {
  return (
    <>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile_setting" element={<ProfileSetting />} />
          <Route path="/account_setting" element={<AccountSetting />} />
          <Route path="/highlight_setting" element={<HighlightSetting />} />
          <Route path="/search_photographer" element={<SearchBar />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/notification_page" element={<NotificationPage />} />
          <Route path="/gallery_page" element={<GalleryPage />} />
          <Route path="/gallery/:id" element={<GallerySettings />} />
          <Route path="/user_profile" element={<ProfilePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/report" element={<Report />} />
          <Route path="/album/:id" element={<AlbumPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
