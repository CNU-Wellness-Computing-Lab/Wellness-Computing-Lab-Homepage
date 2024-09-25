import React from 'react';
import styled from 'styled-components';

const CancelButtonContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const CancelButtonSpan = styled.span`
  position: absolute;
  left: 50%;
  width: 100%;
  height: 2px; /* 버튼의 두께를 조절 */
  background: ${({ theme }) => theme.backgroundColor};
  transform: translate(-50%, -50%);

  &:nth-child(1) {
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:nth-child(2) {
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const CancelButton = ({ onClick }) => {
  return (
    <CancelButtonContainer onClick={onClick}>
      <CancelButtonSpan />
      <CancelButtonSpan />
    </CancelButtonContainer>
  );
};

export default CancelButton;
