import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors } from '../assets/ui/styles';
import EditIcon from '../assets/icons/icon_settings.png';
import DeleteIcon from '../assets/icons/icon_delete.png';

const NewsCardContainer = styled.div`
  background-color: ${({ theme }) => theme.itemColor};
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  opacity: 0;
  padding: 4px;
  transform: translateY(20px);
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

  &.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover .overlay {
    display: flex;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 12px;
  border: 1px solid ${colors.gray100};
`;

const NewsInfo = styled.div`
  padding: 10px 0px;
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const NewsTitle = styled.h3`
  margin: 8px 0px;
  font-weight: 500;
  font-size: medium;
`;

const DateText = styled.p`
  color: ${colors.gray700};
  font-size: 1.2em;
  margin: 0px;
  font-weight: 800;
`;

const Overlay = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  z-index: 1;
`;

const IconButton = styled.button`
  background: rgba(0, 0, 0, 0.3);
  width: 80px;
  border-radius: 20px;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin: 10px 0;

  img {
    width: 30px;
    height: 30px;
  }
`;

const LabelButton = styled.p`
  color: ${colors.white};
  margin: 0px;
  font-weight: 700;
  font-size: 14px;
`;

function NewsCard({ news, onEdit, onDelete, isLoggedIn }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const date = news.date.toDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return (
    <NewsCardContainer ref={cardRef}>
      <NewsImage src={news.imageUrl} alt={news.title} />
      <NewsInfo>
        <DateText>{month}, {year}</DateText>
        <NewsTitle>{news.title}</NewsTitle>
      </NewsInfo>
      {isLoggedIn && (
        <Overlay className="overlay">
          <IconButton onClick={onEdit}>
            <img src={EditIcon} alt="Edit" />
            <LabelButton>Edit</LabelButton>
          </IconButton>
          <IconButton onClick={onDelete}>
            <img src={DeleteIcon} alt="Delete" />
            <LabelButton>Delete</LabelButton>
          </IconButton>
        </Overlay>
      )}
    </NewsCardContainer>
  );
}

export default NewsCard;