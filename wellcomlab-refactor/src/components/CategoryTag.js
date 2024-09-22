// components/CategoryTag.js
import React from 'react';
import styled from 'styled-components';
import rgba from 'hex-to-rgba';
import { colors, media } from '../assets/ui/styles';
import poster from '../assets/icons/icon_receipt_long.png';
import journal from '../assets/icons/icon_receipt_long.png'; 
import other from '../assets/icons/icon_receipt_long.png'; 
import conference from '../assets/icons/icon_receipt_long.png'; 

const CategoryAssets = {
  CONFERENCE: conference,
  JOURNAL: journal,
  POSTER: poster,
  OTHER: other,
};

const CategoryItem = styled.div`
  background-color: ${rgba(colors.mainColor, 0.3)};
  color: ${colors.lowdarkMainColor};
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
  width: 22px; 
  height: 22px;
  margin-right: -3px;
  ${media.mobile`
    width: 18px; 
    height: 18px;
  `}
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
