import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../components/Firebase';
import { colors } from '../assets/ui/styles';
import ProjectItem from '../components/ProjectItem';
import MenuBarHorizontal from '../components/MenuBarHorizontal';
import ProjectModal from '../components/ProjectModal';
import AddCloudIcon from '../assets/icons/icon_cloud_upload.png';

const Container = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 80px 20px 30px;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.backgroundColor};
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

function Projects({ isLoggedIn }) {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Ongoing Projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const storage = getStorage();
        const thumbnailRef = ref(storage, data.thumbnail);
        const thumbnailUrl = await getDownloadURL(thumbnailRef);
        return { ...data, thumbnail: thumbnailUrl, id: doc.id };
      }));
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleAddProject = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm('정말 이 프로젝트를 삭제하시겠습니까?');
    
    if (confirmDelete) {
      try {
      await deleteDoc(doc(db, 'projects', projectId));
      fetchProjects();
      alert('Project가 삭제되었습니다');
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleSaveProject = (isUpdate = false) => {
    fetchProjects();
    setIsModalOpen(false);
    setSelectedProject(null);
    if (isUpdate) {
      alert('Project가 업데이트되었습니다');
    } else {
      alert('Project가 추가되었습니다');
    }
    window.location.reload();
  };

  const filteredProjects = projects.filter(project =>
    activeCategory === 'Ongoing Projects' ? project.status === 'ongoing' : project.status === 'completed'
  );

  return (
    <Background>
      <Container>
        <MenuBarHorizontal
          items={['Ongoing Projects', 'Completed Projects']}
          activeItem={activeCategory}
          onItemClick={handleCategoryChange}
        />
        {isLoggedIn && (
          <AddButton onClick={handleAddProject}>
            <AddIcon src={AddCloudIcon} alt="add icon" />
            Add Project
          </AddButton>
        )}
        {filteredProjects.map((project, index) => (
          <ProjectItem
            key={index}
            project={project}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            isLoggedIn={isLoggedIn}
          />
        ))}
        {isModalOpen && (
          <ProjectModal
          project={selectedProject}
          onSave={(isUpdate) => handleSaveProject(isUpdate)}
          onClose={() => setIsModalOpen(false)}
        />
        )}
      </Container>
    </Background>
  );
}

export default Projects;
