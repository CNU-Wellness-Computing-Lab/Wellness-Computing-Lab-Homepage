import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Members from './pages/Members';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Header from './components/Header';
import Admin from './pages/AdminLogin';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './assets/ui/themes';
import { DarkModeContext, DarkModeProvider } from './context/DarkModeContext';
import News from './pages/News';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    return savedLoginState === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <DarkModeProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Router>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/news" element={<News isLoggedIn={isLoggedIn} />} />
            <Route path="/members" element={<Members isLoggedIn={isLoggedIn} />} />
            <Route path="/publications" element={<Publications isLoggedIn={isLoggedIn} />} />
            <Route path="/projects" element={<Projects isLoggedIn={isLoggedIn} />} />
            <Route path="/contact" element={<Contact isLoggedIn={isLoggedIn} />} />
            <Route path="/admin" element={<Admin setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </DarkModeProvider>
  );
}

export default App;
