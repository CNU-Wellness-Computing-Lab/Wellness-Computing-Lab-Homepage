import React from 'react';
import styled from 'styled-components';
import { colors, fonts, media } from '../assets/ui/styles';
import CategoryTag from './CategoryTag';
import EditIcon from '../assets/icons/icon_settings.png';
import DeleteIcon from '../assets/icons/icon_delete.png';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../assets/ui/PublicationList.css';

const List = styled.ul`
  list-style: none;
  padding: 0px 10px;
  box-sizing: border-box;
  margin: 20px 0;
  font-family: ${fonts.header};
  width: 90vw;
  max-width: 1000px;
;`

const Item = styled.li`
  padding: 24px 36px;
  margin-bottom: 10px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.itemColor};
  position: relative;
  box-sizing: border-box;
  opacity: 1; /* Default to visible */
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.item-hover {
    transition: transform 0.3s ease-in-out;
  }
  &.item-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  }
  &:hover .overlay {
    display: flex;
  }

  ${media.mobile`
    padding: 16px 24px;
    border-radius: 16px;
  `}
;`

const PaperDetails = styled.div`
  flex-grow: 1;
;`

const PaperTitle = styled.h2`
  font-size: clamp(1em, 5vw, 24px);
  color: ${colors.darkgray};
  margin: 8px 0px;
  letter-spacing: -0.5px;
;`

const AuthorsItem = styled.div`
  font-size: clamp(0.8em, 3vw, 18px);
  font-style: italic;
  font-family: 'Roboto';
  color: ${colors.midgray};
  letter-spacing: -0.4px;
;`

const PublicationVenue = styled.div`
  font-size: clamp(0.9em, 3vw, 18px);
  margin-top: 8px;
  font-weight: 800;
  letter-spacing: -0.4px;
  color: ${colors.lowdarkMainColor};
;`

const LabelButton = styled.p`
  color: ${colors.white};
  margin: 0px;
  font-weight: 700;
  font-size: 14px;
;`

const Overlay = styled.div`
  display: none;
  border-radius: 30px;
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
;`

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
;`

const PublicationList = ({ publications = [], onEdit, onDelete, isLoggedIn }) => {
  return (
    <TransitionGroup component={List}>
      {publications.map((publication, index) => (
        <CSSTransition key={index} timeout={500} classNames="fade">
          <Item className="item-hover">
            <PaperDetails>
              <CategoryTag category={publication.category} />
              <PaperTitle>{publication.title}</PaperTitle>
              <AuthorsItem>{publication.authors}</AuthorsItem>
              <PublicationVenue>
                <span>{publication.institution + " "} </span>
                <span>{publication.year}</span>
              </PublicationVenue>
            </PaperDetails>

            {isLoggedIn && (
              <Overlay className="overlay">
                <IconButton onClick={() => onEdit(publication)}>
                  <img src={EditIcon} alt="Edit" />
                  <LabelButton>Edit</LabelButton>
                </IconButton>
                <IconButton onClick={() => onDelete(publication.id)}>
                  <img src={DeleteIcon} alt="Delete" />
                  <LabelButton>Delete</LabelButton>
                </IconButton>
              </Overlay>
            )}
          </Item>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default PublicationList;