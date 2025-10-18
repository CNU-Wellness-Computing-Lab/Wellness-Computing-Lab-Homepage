import React from 'react';
import styled from 'styled-components';
import { colors, media } from '../assets/ui/styles';  

const MenuBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  border: 1px solid ${colors.highlightgray};
  padding: 10px;
  border-radius: 500px;
  white-space: nowrap; /* 항목이 줄바꿈되지 않도록 설정 */
  ${media.mobile`
    flex-flow: row wrap;
    justify-content: space-evenly;;
    border-radius: 16px;
    width: 80%;
  `}
`;

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})`
  background: ${(props) => (props.active ? colors.mainColor : colors.lightgray)};
  color: ${(props) => (props.active ? colors.white : colors.gray)};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: -0.2px;
  border-radius: 200px;
  display: inline-block;

  &:hover {
    background: ${(props) => (props.active ? colors.mainColor : colors.highlightgray)};
  }

  ${media.mobile`
    margin: 5px 0;
    font-size: 1em;
    padding: 10px 16px;
  `}
`;

const MenuBarHorizontal = ({ items, activeItem, onItemClick }) => {
  return (
    <MenuBarContainer>
      {items.map((item) => (
        <StyledButton
          key={item}
          active={activeItem === item}
          onClick={() => onItemClick(item)}
        >
          {item}
        </StyledButton>
      ))}
    </MenuBarContainer>
  );
};

export default MenuBarHorizontal;
