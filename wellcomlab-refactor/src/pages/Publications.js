// Publications.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../components/Firebase'; // Firebase 설정 파일
import MenuBarHorizontal from '../components/MenuBarHorizontal';
import PublicationList from '../components/PublicationList'; // 분리한 컴포넌트 임포트
import { colors } from '../assets/ui/styles';

// 컨테이너 스타일
const Container = styled.div`
  width: 100vw;
  padding: 30px 20px;
  box-sizing: border-box;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const YearHeader = styled.h1`
  width: 100%;
  max-width: 1000px;
  margin: 20px 0;
  padding-left: 10px;
  font-weight: 900;
  font-size: 48px;
  //font-style: italic;
  color: ${colors.cyan};
  font-family: "Bebas Neue";
`;

function Publications() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [publications, setPublications] = useState({});

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    const fetchPublications = async () => {
      let q;
      if (activeCategory === 'All') {
        q = query(collection(db, 'publications'));
      } else {
        q = query(collection(db, 'publications'), where('category', '==', activeCategory));
      }

      try {
        const querySnapshot = await getDocs(q);
        const publicationsData = querySnapshot.docs.map(doc => doc.data());

        // 연도별로 데이터 그룹화
        const groupedByYear = publicationsData.reduce((acc, publication) => {
          const year = publication.year;
          if (!acc[year]) acc[year] = [];
          acc[year].push(publication);
          return acc;
        }, {});

        console.log("Grouped Publications: ", groupedByYear); // 콘솔 로그 추가
        setPublications(groupedByYear);
      } catch (error) {
        console.error("Error fetching publications: ", error);
      }
    };

    fetchPublications();
  }, [activeCategory]);

  return (
    <Container>
      <MenuBarHorizontal
        items={['All', 'Conference', 'Journal', 'Poster', 'Other']}
        activeItem={activeCategory}
        onItemClick={handleCategoryChange}
      />

      {Object.keys(publications).sort((a, b) => b - a).map((year) => (
        <div key={year}>
          <YearHeader>{year}</YearHeader>
          <PublicationList publications={publications[year]} />
        </div>
      ))}
    </Container>
  );
}

export default Publications;
