import React from 'react';
import styled from 'styled-components';
import IntroducePage from '../components/IntroducePage';
import NewsPage from '../components/News';

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  scroll-snap-type: y mandatory; 
  overflow-y: scroll; 
  scroll-behavior: smooth;
  background-color: ${({ theme }) => theme.backgroundColor};
  
  &::-webkit-scrollbar {
    display: none; 
  }
  -ms-overflow-style: none; 
  scrollbar-width: none; 

  /* 모바일에서는 scroll-snap 비활성화 */
  @media (max-width: 768px) {
    scroll-snap-type: none;
    overflow-y: auto;
  }
`;

const PageSection = styled.div`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start; 
  display: flex;
  justify-content: center;
  align-items: center;

  /* 모바일에서는 scroll-snap 비활성화 */
  @media (max-width: 768px) {
    height: auto; /* 각 섹션이 자동으로 높이를 가집니다 */
    padding: 20px 0; /* 여유 공간 추가 */
    scroll-snap-align: none; /* 스크롤 스냅 제거 */
  }
`;

function Home({ isLoggedIn }) {
  return (
    <PageContainer>
      <PageSection>
        <IntroducePage />
      </PageSection>
      <PageSection>
        <NewsPage isLoggedIn={isLoggedIn} />
      </PageSection>
    </PageContainer>
  );
}

export default Home;