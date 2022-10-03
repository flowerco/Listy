import "./App.css";
import { ReactElement, useState } from "react";
import Profile from "./components/Profile";
import LoginPage from "./components/pages/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbars/Navbar";
import { LogoNavbar } from "./components/Navbars/LogoNavbar";
import { MainFeed } from "./components/pages/MainFeed";
import { SearchPage } from "./components/pages/SearchPage";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <nav className="nav-top">
        <LogoNavbar />
      </nav>

      <section className="main-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element="" />
          <Route path="/profile/:username" element="" />
          <Route path="/mainfeed" element={<MainFeed />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate replace to="/mainfeed" />} />
        </Routes>
      </section>

      <footer className="nav-bottom">
        <Navbar />
      </footer>
    </BrowserRouter>
  );
}

export default App;
