import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { colors,media } from '../assets/ui/styles';

const CarouselContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  letter-spacing: -0.1px;

  .carousel .control-dots .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 4px;
    box-shadow: none; 
  }

  .carousel .control-dots .dot.selected {
    background: ${colors.mainColor};
  }
`;

const CarouselImage = styled.img`
  height: 48vh;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 레이어 */
  z-index: 1;
`;

const SlideText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-90%, -50%);
  color: white;
  text-align: start;
  padding: 10px;
  font-size: 1.2em;
  z-index: 2;

  h2 {
    margin: 0;
    font-size: 1.6em;
  }

  p {
    margin: 0;
    margin-top: 8px;
    font-size: 1.2em;
    color: ${colors.gray300};
    ${media.mobile`
      font-size: 0.8em;
      line-height: 1.2;
      letter-spacing: -0.5px;
    `}
  }

  ${media.mobile`
    transform: translate(-50%, -50%); 
    width: 80%; 
  `}
`;

const CarouselComponent = ({ images }) => {
  return (
    <CarouselContainer>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows>
        {images.map((image, index) => (
          <div key={index}>
            <CarouselImage src={image.src} alt={`Slide ${index + 1}`} />
            <Overlay />
            {image.text && (
              <SlideText>
                <h2>{image.text.title}</h2>
                <p>{image.text.description}</p>
              </SlideText>
            )}
          </div>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default CarouselComponent;
