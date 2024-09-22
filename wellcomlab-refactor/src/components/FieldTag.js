// components/FieldTag.js
import React from 'react';
import styled from 'styled-components';
import { colors } from '../assets/ui/styles';
import rgba from 'hex-to-rgba';

const Tag = styled.span`
  background-color: ${rgba(colors.mainColor, 0.3)};
  color: ${colors.lowdarkMainColor};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 700;
  margin: 2px;
  letter-spacing: -0.3px;
  display: inline-block;
`;


const FieldTag = ({ children }) => {
  return <Tag>{children}</Tag>;
};

export default FieldTag;
