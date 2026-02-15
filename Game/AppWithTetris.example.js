import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tetris from '../Game/tetris';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { lazy, Suspense } from "react";

// Lazy load components for better performance
const About = lazy(() => import("./components/About").then(module => ({ default: module.About })));
const Skills = lazy(() => import("./components/Skills").then(module => ({ default: module.Skills })));
const Projects = lazy(() => import("./components/Projects").then(module => ({ default: module.Projects })));
const Contact = lazy(() => import("./components/Contact").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("./components/Footer").then(module => ({ default: module.Footer })));

function MainPage() {
  return (
    <>
      <NavBar />
      <Banner />
      <Suspense fallback={<div className="loading-section">Loading...</div>}>
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tetris" element={<Tetris />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
