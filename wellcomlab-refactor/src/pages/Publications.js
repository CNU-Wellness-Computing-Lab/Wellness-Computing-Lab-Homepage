import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../components/Firebase';
import PublicationList from '../components/PublicationList';
import { colors } from '../assets/ui/styles';
import PublicationModal from '../components/PublicationModal';
import AddCloudIcon from '../assets/icons/icon_cloud_upload.png';

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 80px 20px 30px;
  box-sizing: border-box;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const YearHeader = styled.h1`
  width: 100%;
  max-width: 1000px;
  margin: 20px 0;
  padding-left: 20px;
  box-sizing: border-box;
  font-weight: 900;
  font-size: 48px;
  color: ${colors.mainColor};
  font-family: "Bebas Neue";
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: ${colors.mainColor};
  color: ${({ theme }) => theme.buttonColor};
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
  height: 24px;
`;

function Publications({ isLoggedIn }) {
  const [activeCategory] = useState('All');
  const [allPublications, setAllPublications] = useState([]);
  const [publications, setPublications] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);

  const handleAddPublication = () => {
    setSelectedPublication(null);
    setIsModalOpen(true);
  };

  const handleEditPublication = (publication) => {
    setSelectedPublication(publication);
    setIsModalOpen(true);
  };

  const handleDeletePublication = async (publicationId) => {
    const confirmDelete = window.confirm('정말 이 논문을 삭제하시겠습니까?');
    
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'publications', publicationId));
        fetchPublications();
        alert('Publication가 삭제되었습니다');
      } catch (error) {
        console.error('Error deleting publication:', error);
      }
    } 
  };

  const handleSavePublication = () => {
    fetchPublications();
    setIsModalOpen(false);
    setSelectedPublication(null);
    alert('Publication 업로드 완!');
  };

  const fetchPublications = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'publications'));
      const publicationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllPublications(publicationsData);
      filterPublications(activeCategory, publicationsData);
    } catch (error) {
      console.error("Error fetching publications: ", error);
    }
  };

  const filterPublications = (category, publicationsData = allPublications) => {
    const filteredPublications = category === 'All'
      ? publicationsData
      : publicationsData.filter(pub => pub.category === category);

    const groupedByYear = filteredPublications.reduce((acc, publication) => {
      const year = publication.year;
      if (!acc[year]) acc[year] = [];
      acc[year].push(publication);
      return acc;
    }, {});

    setPublications(groupedByYear);
  };

  useEffect(() => {
    fetchPublications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Background>
      <Container>
        {isLoggedIn && (
          <AddButton onClick={handleAddPublication}>
            <AddIcon src={AddCloudIcon} alt="add icon" />
            Add Publication
          </AddButton>
        )}

        {Object.keys(publications).sort((a, b) => b - a).map((year) => (
          <div key={year}>
            <YearHeader>{year}</YearHeader>
            <PublicationList
              publications={publications[year]}
              onEdit={handleEditPublication}
              onDelete={handleDeletePublication}
              isLoggedIn={isLoggedIn}
            />
          </div>
        ))}

        {isModalOpen && (
          <PublicationModal
            publication={selectedPublication}
            onSave={handleSavePublication}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Container>
    </Background>
  );
}

export default Publications;