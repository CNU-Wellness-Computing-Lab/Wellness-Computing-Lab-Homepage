import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors, media } from '../assets/ui/styles';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal'; 
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../components/Firebase';
import AddCloudIcon from '../assets/icons/icon_cloud_upload.png';
import { ThemeContext } from 'styled-components'; // 테마 컨텍스트 사용


const Container = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 100px 20px 30px;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;


const AddButton = styled.button`
  padding: 10px 20px;
  background-color: ${colors.mainColor};
  color: ${({ theme }) => theme.buttonColor}; // 테마 적용
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; 
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.4px;

  &:hover {
    background-color: ${colors.gray500};
    color: ${({ theme }) => theme.buttonColor};
  }
`;

const AddIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Title = styled.h1`
  width: 100%;
  letter-spacing: -0.4px;
  font-weight: 800;
  text-align: center;
  margin: 20px 0px;
  color: ${colors.mainColor};
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  justify-items: center;
  width: 100%;
  grid-gap: 12px;
  ${media.gridSize`
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  `}
`;

function AllNews({ isLoggedIn }) {
    const [news, setNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const handleAddNews = () => {
    setSelectedNews(null); 
    setIsModalOpen(true);
  };

  const handleSaveNews = (newNews) => {
    console.log('Saving new news:', newNews);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(collection(db, 'news'), orderBy('date', 'desc'));
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
  }, []);

  return (
    <Container>
      {isLoggedIn && (
        <>
          <AddButton onClick={handleAddNews}>
            <AddIcon src={AddCloudIcon} alt="add icon" />
            Add News
          </AddButton>
          {isModalOpen && (
            <NewsModal
              news={selectedNews}
              onSave={handleSaveNews}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      )}
      <Title>Latest News</Title>
      <NewsGrid>
        {news.map((n, index) => (
          <NewsCard key={index} news={n} />
        ))}
      </NewsGrid>
    </Container>
  );
  
}

export default AllNews;
