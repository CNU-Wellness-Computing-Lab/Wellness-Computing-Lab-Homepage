import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors, media } from '../assets/ui/styles';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal'; 
import { collection, getDocs, query, orderBy, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../components/Firebase';
import AddCloudIcon from '../assets/icons/icon_cloud_upload.png';

const BgContainer = styled.div`
width: 100%;
height: auto;
background-color: ${({ theme }) => theme.backgroundColor};
`

const Container = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 70px 20px 30px;
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
  grid-gap: 16px;
  ${media.gridSize`
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  `}
`;

function News({ isLoggedIn }) {
  const [news, setNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

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

  const handleAddNews = () => {
    setSelectedNews(null);
    setIsModalOpen(true);
  };

  const handleEditNews = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const handleDeleteNews = async (newsId) => {
    await deleteDoc(doc(db, 'news', newsId));
    setNews(news.filter((n) => n.id !== newsId));
    alert('뉴스가 삭제되었습니다.');
  };

  const handleSaveNews = async (newsItem) => {
    if (selectedNews) {
      await updateDoc(doc(db, 'news', selectedNews.id), newsItem);
      alert('뉴스 정보가 업데이트되었습니다.');
      window.location.reload();
    } else {
      const docRef = await addDoc(collection(db, 'news'), newsItem);
      newsItem.id = docRef.id;
      setNews([...news, newsItem]); 
      alert('새 뉴스가 추가되었습니다.');
      window.location.reload();
    }
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <BgContainer>
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
          <NewsCard
            key={index}
            news={n}
            onEdit={() => handleEditNews(n)} // 수정 기능
            onDelete={() => handleDeleteNews(n.id)} // 삭제 기능
            isLoggedIn={isLoggedIn}
          />
        ))}
      </NewsGrid>
    </Container>
    </BgContainer>
  );
}

export default News;