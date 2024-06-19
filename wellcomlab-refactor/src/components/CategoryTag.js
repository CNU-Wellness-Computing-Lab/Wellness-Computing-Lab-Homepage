// components/CategoryTag.js
import React from 'react';
import styled from 'styled-components';
import rgba from 'hex-to-rgba';
import { colors } from '../assets/ui/styles';
import poster from '../assets/icons/icon_poster_cyan.png'; // 아이콘 이미지 경로를 수정하세요
import journal from '../assets/icons/icon_journal_cyan.png'; // 아이콘 이미지 경로를 수정하세요
import other from '../assets/icons/icon_other_cyan.png'; // 아이콘 이미지 경로를 수정하세요
import conference from '../assets/icons/icon_conference_cyan.png'; // 아이콘 이미지 경로를 수정하세요

const CategoryAssets = {
  CONFERENCE: conference,
  JOURNAL: journal,
  POSTER: poster,
  OTHER: other,
};

const CategoryItem = styled.div`
  background-color: ${rgba(colors.cyan, 0.3)};
  color: ${colors.cyan};
  padding: 6px 12px 6px 10px;
  font-size: 14px;
  font-weight: 700;
  width: fit-content;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px; // 아이콘과 텍스트 간격
`;

const CategoryIcon = styled.img`
  width: 18px; 
  height: 18px;
  margin-right: -3px;
`;

const CategoryTag = ({ category }) => {
  const iconSrc = CategoryAssets[category.toUpperCase()] || other;
  return (
    <CategoryItem>
      <CategoryIcon src={iconSrc} alt={category} />
      {category}
    </CategoryItem>
  );
};

export default CategoryTag;
