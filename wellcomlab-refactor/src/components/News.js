import React, { useState, useEffect } from 'react';
import { colors, fonts, media } from '../assets/ui/styles';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NewsCard from './NewsCard';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../components/Firebase';

import viewMoreIcon from '../assets/icons/icon_view_more.png';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.background};
  padding: 80px 20px 30px;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin: 0 auto;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; 
  }
  -ms-overflow-style: none;  
  scrollbar-width: none; 

  ${media.mobile`
    height: auto;
    `
    }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  letter-spacing: -0.4px;
  font-weight: 800;
  margin: 0px;
  color: ${colors.mainColor};
  ${media.mobile`
    font-size: 1.5em;
    `
    }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  justify-items: center;
  width: 100%;
  grid-gap: 12px;
  ${media.gridSize`
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    `
    }
`;


const LabelButton = styled.p`
  color: ${colors.mainColor};
  margin: 0px;
  padding: 0px;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: -0.2px;
`;

const IconButton = styled.button`
  background: ${colors.white};
  font-family: ${fonts.content};
  width: 160px;
  border-radius: 40px;
  padding: 8px 8px 8px 20px;
  border: none;
  cursor: pointer;
  margin: 10px 0;
  border: 1.8px solid ${colors.mainColor};
  display: flex; 
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: space-between; 
  img {
    width: 28px;
    height: 28px;
  }
  ${media.gridSize`
    padding: 4px 4px 4px 20px;
    width: 140px;
    `
    }
`;

function NewsPage({ isLoggedIn }) {
  const [news, setNews] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate('/news');
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(
          collection(db, 'news'),
          orderBy('date', 'desc'),
        );

        const querySnapshot = await getDocs(q);
        const newsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const id = doc.id;
            const storage = getStorage();
            const newsRef = ref(storage, data.imageUrl);
            const newsUrl = await getDownloadURL(newsRef);
            return { ...data, imageUrl: newsUrl, id };
          })
        );
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();

    // 화면 크기 감지하여 모바일 여부 판단
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 663); 
    };

    // 초기화 및 리사이즈 이벤트 등록
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <HeaderContainer>
      <Title>Latest news</Title>
        {!isMobile && ( /* 모바일일 경우 버튼 숨기기 */
          <IconButton onClick={handleSeeMore}>
            <LabelButton>View More</LabelButton>
            <img src={viewMoreIcon} alt="ViewMoreButton" />
          </IconButton>
        )}
      </HeaderContainer>
      <NewsGrid>
        {news
          .slice(0, isMobile ? news.length : 6) 
          .map((n, index) => (
            <NewsCard key={index} news={n} />
          ))}
      </NewsGrid>
    </Container>
  );
}

export default NewsPage;