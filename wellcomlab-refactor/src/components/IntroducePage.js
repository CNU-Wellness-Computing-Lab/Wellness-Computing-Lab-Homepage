import React from 'react';
import { colors, media } from '../assets/ui/styles';
import styled  from 'styled-components';
import CarouselComponent from '../components/CarouselComponent';
import Side1 from '../assets/images/wellcomlab_members_images.jpg';
import Side2 from '../assets/images/wcl_image2.jpeg';
import Side3 from '../assets/images/wcl_image4.jpeg';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const CarouselContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
  margin-top: 0;
`;

const ContentContainer = styled.div`
  width: 90%;
  max-width: 1000px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: start;
  ${media.mobile`
    width: 80%;
    `
    }
`;

const Title = styled.h1`
  letter-spacing: -0.6px;
  font-weight: 800;
  margin-bottom: 0;
  color: ${colors.mainColor};
`;

const Content = styled.p`
  letter-spacing: -0.2px;
  line-height: 1.5;
  font-size: 1.2em;
  ${media.mobile`
    font-size: 1em;
    `
    }
  font-weight: 200;
  color: ${({ theme }) => theme.titleColor};;
  `;

function IntroducePage() {
  const images = [
    {
      src: Side1,
      text: {
        title: 'Chungnam National University Wellness Computing Lab.',
        description: 'Our core mission is to contribute to the betterment of well-being through HCI research!',
      },
    },
    {
      src: Side2,
      text: {
        title: 'Human-Computer Interaction',
        description: 'Centered around Human-Computer Interaction (HCI), our research explores the realms of UI/UX, persuasive computing.',
      },
    },
    {
      src: Side3,
      text: {
        title: 'Digital Healthcare Research',
        description: 'With a focus on digital healthcare, we contribute to the advancement of human health and happiness.',
      },
    },
  ];

  return (
    <>
      <Container>
        <CarouselContainer>
          <CarouselComponent images={images} />
        </CarouselContainer>
        <ContentContainer>
          <div>
            <Title>Welcome to Wellcom lab!</Title>
            <Content>
              The Wellness Computing Lab (Wellcom Lab), based in the School of Computing at CNU, specializes in human-computer interaction (HCI) research.
              <br />
              <br />
              Our work is dedicated to improving how people engage with technology, covering areas such as HCI, UI/UX, persuasive computing, digital therapeutics, and Human-AI interaction. Our primary goal is to enhance well-being through innovative HCI research. By focusing on creating user-centered technology, we strive to make meaningful contributions to both the field and individuals' lives.
              <br />
            </Content>
          </div>
        </ContentContainer>
      </Container>
    </>
  );
}

export default IntroducePage;