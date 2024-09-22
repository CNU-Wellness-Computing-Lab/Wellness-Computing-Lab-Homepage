import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../assets/ui/styles';

const IconLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 36px;
  text-decoration: none;
  color: ${colors.gray300};
  letter-spacing: -0.3px;
  background-color: rgba(1, 1, 1, 0.6);
  border-radius: 5px;
  cursor: pointer; 
  font-size: 14px;
  position: relative;

  img {
    width: 32px;
    height: 32px;
    margin: 0px 6px;
  }
`;

const CopiedMessage = styled.span`
  position: absolute;
  right: 10px;
  font-size: 12px;
  letter-spacing: -0.5px;
  font-weight: 800;
  color: ${colors.mainColor};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const IconLink = ({ href, src, alt, name }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(href); // Copies text to clipboard
    setCopied(true); // Sets the copied state

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <IconLinkContainer onClick={handleCopy}>
      <img src={src} alt={alt} />
      {name}
      {/* <CopiedMessage visible={copied}>Copied!</CopiedMessage> */}
    </IconLinkContainer>
  );
};

export default IconLink;