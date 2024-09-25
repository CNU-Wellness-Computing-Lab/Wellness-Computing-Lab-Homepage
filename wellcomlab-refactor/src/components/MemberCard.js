import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors } from '../assets/ui/styles';
import FieldTag from './FieldTag';
import IconLink from './IconLink';

import emailIcon from '../assets/icons/icon_email.png';
import githubIcon from '../assets/icons/icon_git.png';
import linkedinIcon from '../assets/icons/icon_linkedin.png';
import EditIcon from '../assets/icons/icon_settings.png';
import DeleteIcon from '../assets/icons/icon_delete.png';

const MemberCardContainer = styled.div`
  background-color: ${({ theme }) => theme.itemColor};
  margin: 20px 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  position: relative;

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

const Overlay = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;

  &.overlay-active {
    display: flex;
  }
`;

const ContactMe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  width: 70%;
  img {
    width: 30px;
    height: 30px;
  }
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

const ProfileImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  margin-bottom: 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const MemberInfo = styled.div`
  padding: 4px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const MemberName = styled.h2`
  margin: 0;
  width: 100%;
  color: ${colors.darkgray};
  font-size: 20px;
  text-align: center;
`;

const MemberPosition = styled.p`
  margin: 5px 0 0 0;
  color: ${colors.midgray};
  text-align: center;
  font-size: 14px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px 10px;
  width: 100%;
  justify-content: flex-start;
`;

const TagWrapper = styled.div`
  max-width: 180px;
  display: flex;
`;

const LabelButton = styled.p`
  color: ${colors.white};
  margin: 0px;
  font-weight: 700;
  font-size: 14px;
;`

const MemberCard = ({ member, onEdit, onDelete, isLoggedIn }) => {
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

    // cardRef.current 값을 안전하게 저장
    const currentCardRef = cardRef.current;

    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  return (
    <MemberCardContainer ref={cardRef}>
      <ProfileImage src={member.profileUrl} alt={member.name} />
      <MemberInfo>
        <MemberName>{member.name}</MemberName>
        <MemberPosition>{member.degree}</MemberPosition>
        <TagsContainer>
          {member.researchField.map((field, index) => (
            <TagWrapper key={index}>
              <FieldTag>{field}</FieldTag>
            </TagWrapper>
          ))}
        </TagsContainer>
        
        <Overlay className="overlay">
          {isLoggedIn ? (
            <>
              <IconButton onClick={onEdit}>
                <img src={EditIcon} alt="Edit" />
                <LabelButton>Edit</LabelButton>
              </IconButton>
              <IconButton onClick={onDelete}>
                <img src={DeleteIcon} alt="Delete" />
                <LabelButton>Delete</LabelButton>
              </IconButton>
            </>
          ) : (
            <ContactMe>
              <IconLink href={member.email} src={emailIcon} alt="Email" name={"mail"} />
              <IconLink href={member.github} src={githubIcon} alt="GitHub" name={"GitHub"} />
              <IconLink href={member.linkedin} src={linkedinIcon} alt="LinkedIn" name={"LinkedIn"} />
            </ContactMe>
          )}
        </Overlay>
      </MemberInfo>
    </MemberCardContainer>
  );
};

export default MemberCard;