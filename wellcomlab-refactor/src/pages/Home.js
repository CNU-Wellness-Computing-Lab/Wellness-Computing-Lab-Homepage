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
`;

const PageSection = styled.div`
  width: 100%;
  height: 100vh; /* 각 섹션이 화면 전체를 차지하도록 설정 */
  scroll-snap-align: start; /* 섹션의 시작 위치에 스냅 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home({ isLoggedIn }) {

  return (
    <PageContainer>
      <PageSection>
        <IntroducePage />
      </PageSection>
      <PageSection>
        <NewsPage isLoggedIn={isLoggedIn}/>
      </PageSection>
    </PageContainer>
  );
}

export default Home;