import React from 'react';
import styled from 'styled-components';
import { colors, fonts, fontSize, media } from '../assets/ui/styles';  
import LandingSlider from '../components/LandingSlider';

const Subtitle = styled.h4`
  color: ${colors.black};
  width: 100%;
  max-width: 800px;
  text-align: left;  
  margin: 0;
  margin-top: 26px;
  margin-bottom: 4px;
`;

function Home() {
  return (
    <div>
      <LandingSlider />
      <Subtitle>Welcome to the Home Page</Subtitle>
      <p>This is the Home page of our React application.</p>
    </div>
  );
}

export default Home;
