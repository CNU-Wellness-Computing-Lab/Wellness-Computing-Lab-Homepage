import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import cnuMap from '../assets/images/cnu_map_with_parking.svg';
import { colors, media } from '../assets/ui/styles';
import mapIcon from '../assets/icons/icon_map.png';
import qIcon from '../assets/icons/icon_parking.png';

const BgContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 100%;
  height: auto;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 80px 20px 30px;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  ${media.mobile`
    flex-direction: column;
  `}
`;

const MapImage = styled.img`
  width: 40vw; 
  max-width: 500px;
  margin: 0px 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  &.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  ${media.mobile`
    width: 60vw; 
    margin-top: 36px;
  `}
`;

const Content = styled.div`
  padding-left: 24px;
  color: ${colors.midgray};
  width: 60%;

  ${media.mobile`
    width: 80%;
  `}
`;

const Title = styled.h2`
  letter-spacing: -0.5px;
  margin: 0px;
  margin-top: 8%;
  font-size: 24px;
  font-weight: 800;
  color: ${colors.mainColor};
`;

const Text = styled.p`
  margin: 4px 0px;
  letter-spacing: -0.2px;
`;

const GoogleMapButton = styled.a`
  display: inline-flex; 
  align-items: center;
  padding: 8px 16px;
  background-color: ${colors.mainColor};
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: bold;
  margin: 8px 0px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.gray500};
  }

  img {
    margin-right: 8px;
    width: 28px;
    height: 28px;
  }
`;

const QuestionBox = styled.div`
  background-color: ${colors.gray100};
  padding: 8px;
  border-radius: 12px;
  border: 1px solid ${colors.gray300};
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  &.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  img {
    margin: 0px 4px; 
    width: 20px;
    height: 24px;
  }

  p {
    margin: 0px;
    padding: 4px 26px;
  }

  h3 {
    margin: 4px 0px;
    font-size: 18px;
    font-weight: 800;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
`;

function Contact() {
  const mapRef = useRef(null);
  const questionBoxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    // mapRef.current와 questionBoxRef.current를 안전하게 처리하기 위해 지역 변수로 저장
    const currentMapRef = mapRef.current;
    const currentQuestionBoxRef = questionBoxRef.current;

    if (currentMapRef) {
      observer.observe(currentMapRef);
    }

    if (currentQuestionBoxRef) {
      observer.observe(currentQuestionBoxRef);
    }

    return () => {
      if (currentMapRef) {
        observer.unobserve(currentMapRef);
      }
      if (currentQuestionBoxRef) {
        observer.unobserve(currentQuestionBoxRef);
      }
    };
  }, []);

  return (
    <BgContainer>
      <Container>
        <Content>
          <Title>Wellcom Lab</Title>
          <Text>Wellness Computing Lab</Text>
          <Text>웰니스 컴퓨팅 연구실</Text>

          <Title>Location</Title>
          <Text>Room 606, W2, 99 Daehak-ro, Yuseong-gu, Daejeon, Republic of Korea (34134)</Text>
          <GoogleMapButton 
            href="https://www.google.com/maps/place/%EC%B6%A9%EB%82%A8%EB%8C%80%ED%95%99%EA%B5%90+%EA%B3%B5%EA%B3%BC%EB%8C%80%ED%95%995%ED%98%B8%EA%B4%80+(W2)/data=!4m6!3m5!1s0x35654b8d2855a151:0xc0e31805438f6e32!8m2!3d36.3667148!4d127.3443006!16s%2Fg%2F11g0j4jnrd?entry=ttu"
            target="_blank"
          >
            <img src={mapIcon} alt="Map Icon" />
            Google Map
          </GoogleMapButton>

          <QuestionBox ref={questionBoxRef}>
            <QuestionHeader>
              <img src={qIcon} alt="q" />
              <h3>Where is the parking lot?</h3>
            </QuestionHeader>
            <p>It’s located between W2 and W3.</p>
          </QuestionBox>

          <Title>Email</Title>
          <Text>Prof. Jaejeung Kim: jjkim@cnu.ac.kr</Text>
          <Text>Lab Mail: wellcomlab@gmail.com</Text>
        </Content>
        <MapImage src={cnuMap} alt="map_image" ref={mapRef} />
      </Container>
    </BgContainer>
  );
}

export default Contact;