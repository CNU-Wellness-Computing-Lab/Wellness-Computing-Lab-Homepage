import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors, fonts, media } from '../assets/ui/styles';
import LogoLight from '../assets/icons/wcl_logo.svg';
import LogoDark from '../assets/icons/wcl_logo_dark.svg';
import MenuIcon from './MenuIcon';
import { DarkModeContext } from '../context/DarkModeContext';

const StyledHeader = styled.header`
  width: 100vw;
  padding: 0 20px;
  box-sizing: border-box;
  font-family: ${fonts.content};
  background-color: ${({ theme }) => theme.backgroundColor};
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoImage = styled.img`
  height: 48px;
  margin-right: 12px;
`;

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: 800;
  font-size: 1em;
  margin: 0 15px;
  color: ${({ theme }) => theme.titleColor};
  cursor: pointer;

  &:hover, &:focus {
    color: ${colors.mainColor};
  }

  &.active {
    color: ${colors.mainColor};
  }
`;

const NavLinks = styled.div`
  display: flex;

  ${media.mobile`
    display: none;
  `}
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  z-index: 10;
  overflow: hidden;
`;

const MobileMenuItem = styled(NavLink)`
  margin: 10px 0;
  color: ${colors.white};
  font-size: 16px;
  font-weight: 900;
  text-decoration: none;
  cursor: pointer;

  &:hover, &:focus {
    color: ${colors.mainColor};
  }

  &.active {
    color: ${colors.mainColor};
  }
`;

const MobileMenuIcon = styled.div`
  display: none;

  ${media.mobile`
    display: block;
  `}
`;

const LogoutButton = styled.button`
  margin-left: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.backgroundColor};
  background-color: ${colors.gray700};
  border: none;
  cursor: pointer;
  border-radius: 20px;

  &:hover, &:focus {
    color: ${colors.mainColor};
  }
`;

function Header({ isLoggedIn, setIsLoggedIn }) {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuIconRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !menuIconRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('darkMode');
    setIsLoggedIn(false);
    setDarkMode(false);
    navigate('/');
    window.location.reload()
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        console.log('Window resized, closing menu');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <StyledHeader>
      <Container>
        <StyledLink to="/">
          <LogoImage src={darkMode ? LogoDark : LogoLight} alt="Logo" />
        </StyledLink>

        <NavLinks>
          <StyledLink to="/members">Members</StyledLink>
          <StyledLink to="/publications">Publications</StyledLink>
          <StyledLink to="/projects">Projects</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>
          {/* {isLoggedIn && <StyledLink to="/secret">Secret</StyledLink>} */}
        </NavLinks>

        {isLoggedIn && <LogoutButton onClick={handleLogout}>Logout</LogoutButton>}

        <MobileMenuIcon ref={menuIconRef} onClick={handleMenuToggle}>
          <MenuIcon isActive={isMobileMenuOpen} />
        </MobileMenuIcon>

        {isMobileMenuOpen && (
          <MobileMenu ref={menuRef}>
            <MobileMenuItem to="/members" onClick={handleMenuToggle}>Members</MobileMenuItem>
            <MobileMenuItem to="/publications" onClick={handleMenuToggle}>Publications</MobileMenuItem>
            <MobileMenuItem to="/projects" onClick={handleMenuToggle}>Projects</MobileMenuItem>
            <MobileMenuItem to="/contact" onClick={handleMenuToggle}>Contact</MobileMenuItem>
            {isLoggedIn && <MobileMenuItem to="/secret" onClick={handleMenuToggle}>Secret</MobileMenuItem>}
          </MobileMenu>
        )}
      </Container>
    </StyledHeader>
  );
}

export default Header;
