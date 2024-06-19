import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { colors, fonts, media } from '../assets/ui/styles';  
import Logo from '../assets/icons/logo.png'; // 로고 이미지 가져오기
import MenuIcon from './MenuIcon'; // MenuIcon 컴포넌트 가져오기

// 헤더 스타일
const StyledHeader = styled.header`
  width: 100vw;
  padding: 0 20px;
  box-sizing: border-box;
  font-family: ${fonts.header};
  display: flex;
  justify-content: center;
`;

// 컨테이너 스타일
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 60px; 
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 로고 이미지 스타일
const LogoImage = styled.img`
  height: 32px; // 높이 조정
  margin-right: 10px;
`;

// 타이틀 스타일
const TitleWellness = styled.span`
  font-weight: 800;
  font-size: clamp(24px, 2vw, 36px);
  color: ${colors.darkgray};
`;

const TitleComputing = styled.span`
  margin-left: 4px;
  letter-spacing: -1.2px;
  font-weight: normal;
  font-size: clamp(24px, 2vw, 36px);
  color: ${colors.darkgray};
`;

// 링크 스타일
const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  margin: 0 15px;
  color: ${colors.darkgray};
  cursor: pointer;

  &:hover, &:focus {
    color: ${colors.cyan};
  }

  &.active {
    color: ${colors.cyan};
  }
`;

// 네비게이션 링크 스타일
const NavLinks = styled.div`
  display: flex;

  ${media.mobile`
    display: none;
  `}
`;

// 모바일 아이콘 컨테이너 스타일
const MobileIconContainer = styled.div`
  display: none;

  ${media.mobile`
    display: block;
  `}
`;

// 애니메이션 키프레임 정의
const slideDown = keyframes`
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: auto;
    opacity: 1;
  }
`;

// 모바일 메뉴 스타일
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
  animation: ${slideDown} 0.3s ease-out;
  overflow: hidden;
`;

// 모바일 메뉴 아이템 스타일
const MobileMenuItem = styled(NavLink)`
  margin: 10px 0;
  color: ${colors.white};
  font-size: 16px;
  font-weight: 900;
  text-decoration: none;
  cursor: pointer;

  &:hover, &:focus {
    color: ${colors.cyan};
  }

  &.active {
    color: ${colors.cyan};
  }
`;

function Header({ isLoggedIn }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuIconRef = useRef(null);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !menuIconRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  // 화면 크기 변경시 모바일 메뉴 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 메뉴 바깥 클릭 시 메뉴 닫기
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
        {/* 로고 및 타이틀 */}
        <StyledLink to="/">
          <LogoImage src={Logo} alt="Logo" />
          <TitleWellness>Wellness</TitleWellness>
          <TitleComputing>Computing</TitleComputing>
        </StyledLink>

        {/* 데스크탑 네비게이션 링크 */}
        <NavLinks>
          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/members">Members</StyledLink>
          <StyledLink to="/publications">Publications</StyledLink>
          <StyledLink to="/projects">Projects</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>
          {isLoggedIn && <StyledLink to="/secret">Secret</StyledLink>}
        </NavLinks>

        {/* 모바일 햄버거 아이콘 */}
        <MobileIconContainer ref={menuIconRef} onClick={handleMenuToggle}>
          <MenuIcon isActive={isMobileMenuOpen} />
        </MobileIconContainer>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <MobileMenu ref={menuRef}>
            <MobileMenuItem to="/about" onClick={handleMenuToggle}>About</MobileMenuItem>
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
