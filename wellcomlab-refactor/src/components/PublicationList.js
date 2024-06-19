// components/PublicationList.js
import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../assets/ui/styles';
import CategoryTag from './CategoryTag'; // CategoryTag 컴포넌트 임포트

// 스타일 정의
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  font-family: ${fonts.header};
  width: 100vm;
  max-width: 800px;
`;

const Item = styled.li`
  padding: 10px;
  margin-bottom: 10px;
`;

const PaperTitle = styled.h2`
  color: ${colors.darkgray};
  margin: 8px 0px;
  letter-spacing: -1.2px;
`;

const AuthorsItem = styled.div`
  font-style: italic;
  color: ${colors.midgray};
  letter-spacing: -0.4px;
  font-size: 14px;
`;

const PublicationVenue = styled.div`
    margin-top: 4px;
    font-size: 14px;
    font-weight: 800;
    color: ${colors.midgray};
`

// PublicationList 컴포넌트
const PublicationList = ({ publications }) => {
  return (
    <List>
      {publications.map((publication, index) => (
        <Item key={index}>
          <CategoryTag category={publication.category} />
          <PaperTitle>{publication.title}</PaperTitle>
          <AuthorsItem>{publication.authors}</AuthorsItem>
          <PublicationVenue>
            <span>{publication.institution + " "} </span>
            <span>{publication.year}</span>
          </PublicationVenue>
        </Item>
      ))}
    </List>
  );
};

export default PublicationList;
