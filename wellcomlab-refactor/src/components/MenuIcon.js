import React, { useContext } from 'react';
import styled from 'styled-components';
import { DarkModeContext } from '../context/DarkModeContext';

const MenuIconContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 16px;
  cursor: pointer;
`;

const MenuIconSpan = styled.span`
  position: absolute;
  left: 50%;
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.color};
  border-radius: 4px;
  transform: translate(-50%, 0) rotate(0deg);
  transition: 0.2s ease-in-out;

  &:nth-child(1) {
    top: 0px;
  }

  &:nth-child(2),
  &:nth-child(3) {
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &:nth-child(4) {
    bottom: 0;
  }

  ${({ $active }) =>
    $active &&
    `
    &:nth-child(1) {
      top: 50%;
      width: 0;
      transform: translate(-50%, -50%);
    }

    &:nth-child(2) {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:nth-child(3) {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &:nth-child(4) {
      bottom: 50%;
      width: 0;
      transform: translate(-50%, 50%);
    }
  `}
`;

const MenuIcon = ({ isActive }) => {
  const { darkMode } = useContext(DarkModeContext);
  
  return (
    <MenuIconContainer>
      <MenuIconSpan $active={isActive} />
      <MenuIconSpan $active={isActive} />
      <MenuIconSpan $active={isActive} />
      <MenuIconSpan $active={isActive} />
    </MenuIconContainer>
  );
};

export default MenuIcon;
