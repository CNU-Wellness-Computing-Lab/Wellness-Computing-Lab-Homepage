import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors, media } from '../assets/ui/styles';
import EditIcon from '../assets/icons/icon_settings.png';
import DeleteIcon from '../assets/icons/icon_delete.png';

const ProjectContainer = styled.div`
  position: relative;
  padding: 0px 20px 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 86vw;
  max-width: 1000px;
  background-color: ${({ theme }) => theme.itemColor};
  margin-bottom: 10px;
  border-radius: 30px;
  border-bottom: 1px solid ${colors.highlightgray};
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

  &.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  ${media.mobile`
    flex-direction: column;
    padding: 16px 5px;
    width: 85vw;
  `}

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  &:hover .overlay { /* 추가된 스타일 */
    display: flex;
  }
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 200px;
  background-color: ${colors.lightgray};
  border-radius: 20px;
  object-fit: cover;

  ${media.mobile`
    width: 80vw;
    height: 120px; /* 1:3 비율 */
    margin-bottom: 14px ;
  `}
`;

const ProjectContent = styled.div`
  padding-left: 20px;
  letter-spacing: -0.5px;
  color: ${colors.midgray};
  width: 100%;
`;

const ProjectTitle = styled.h2`
  font-size: clamp(18px, 5vw, 24px);
  color: ${colors.darkgray};   
  width: fit-content;
  padding: 8px 16px;
  margin: 0px;
  margin-left: 10px;
  margin-bottom: 10px;
  border-left: solid 6px ${colors.highlightgray};

  ${media.mobile`
    font-size: 18px;
  `}
`;

const Description = styled.p`
  font-size: clamp(12px, 3vw, 18px);
  margin: 0px;
  text-indent: 20px;
  line-height: 24px;
  padding: 0px 20px;
`;

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
;`

const ProjectItem = ({ project, onEdit, onDelete, isLoggedIn }) => {
  const containerRef = useRef(null);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <ProjectContainer ref={containerRef}>
      <Thumbnail src={project.thumbnail} alt={project.name} />
      <ProjectContent>
        <ProjectTitle>{project.name}</ProjectTitle>
        <Description>{project.description}</Description>
      </ProjectContent>

      {isLoggedIn && (
        <Overlay className="overlay">
          <IconButton onClick={() => onEdit(project)}>
            <img src={EditIcon} alt="Edit" />
            <LabelButton>Edit</LabelButton>
          </IconButton>
          <IconButton onClick={() => onDelete(project.id)}>
            <img src={DeleteIcon} alt="Delete" />
            <LabelButton>Delete</LabelButton>
          </IconButton>
        </Overlay>
      )}
    </ProjectContainer>
  );
};

export default ProjectItem;
