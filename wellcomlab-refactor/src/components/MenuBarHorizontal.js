import React from 'react';
import styled from 'styled-components';
import { colors, media } from '../assets/ui/styles';  

const MenuBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid ${colors.highlightgray};
  padding: 10px;
  border-radius: 200px;
  white-space: nowrap; /* 항목이 줄바꿈되지 않도록 설정 */
  ${media.mobile`
    flex-flow: row wrap;
    justify-content: flex-start;
    border-radius: 16px;
    margin: 10px;
    width: 100vm;
  `}
`;

const MenuItem = styled.button`
  background: ${(props) => (props.active ? colors.cyan : colors.lightgray)};
  color: ${(props) => (props.active ? colors.white : colors.gray)};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 900;
  border-radius: 200px;
  display: inline-block;

  &:hover {
    background: ${(props) => (props.active ? colors.cyan : colors.highlightgray)};
  }

  ${media.mobile`
    margin: 5px 0;
  `}
`;

const MenuBarHorizontal = ({ items, activeItem, onItemClick }) => {
  return (
    <MenuBarContainer>
      {items.map((item) => (
        <MenuItem
          key={item}
          active={activeItem === item}
          onClick={() => onItemClick(item)}
        >
          {item}
        </MenuItem>
      ))}
    </MenuBarContainer>
  );
};

export default MenuBarHorizontal;
