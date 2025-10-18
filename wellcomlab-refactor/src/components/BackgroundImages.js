import React from 'react';
import styled, { keyframes } from 'styled-components';
import WelcomeImage from '../assets/images/welcome_to.png';
import HumanComputingImage from '../assets/images/human_computing.png';
import GymmingImage from '../assets/images/gymming.png';
import StartImage from '../assets/images/start.png';

// 애니메이션 정의
const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Image = styled.img`
  position: absolute; /* 이미지를 절대 위치로 설정 */
`;

const WelcomeImg = styled(Image)`
  width: 50vw;
  left: 20vw;
  top: 100vh;
  transform: translate(-50%, -100%);

  @media (max-width: 768px) {
    width: 60vw;
    left: 20%;
    top: 70%;
    transform: translate(-50%, -30%);
  }
`;

const HumanComputingImg = styled(Image)`
  width: 10vw;
  left: 70vw;
  top: 45vh;
  animation: ${floatAnimation} 4s ease-in-out infinite;
  animation-delay: 0s;

  @media (max-width: 768px) {
    width: 25vw;
    left: 75%;
    top: 20%;
  }
`;

const GymmingImg = styled(Image)`
  width: 10vw;
  left: 38vw;
  top: 35vh;
  animation: ${floatAnimation} 4s ease-in-out infinite;
  animation-delay: 1s;

  @media (max-width: 768px) {
    width: 25vw;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
  }
`;

const StartImg = styled(Image)`
  width: 12vw;
  left: 20vw;
  top: 50vh;
  animation: ${floatAnimation} 4s ease-in-out infinite;
  animation-delay: 2s;

  @media (max-width: 768px) {
    width: 25vw;
    left: 25%;
    top: 60%;
  }
`;

const BackgroundImages = () => (
  <>
    <WelcomeImg src={WelcomeImage} alt="WelcomeImage" />
    <HumanComputingImg src={HumanComputingImage} alt="HumanComputingImage" />
    <GymmingImg src={GymmingImage} alt="GymmingImage" />
    <StartImg src={StartImage} alt="StartImage" />
  </>
);

export default BackgroundImages;
