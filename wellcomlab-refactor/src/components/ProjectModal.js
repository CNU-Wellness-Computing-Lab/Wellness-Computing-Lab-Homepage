// src/components/ProjectModal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../components/Firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // import firebase storage functions
import { colors } from '../assets/ui/styles';
import CancelButton from './CancelButton';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 120px;
  color: ${colors.midgray};
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${colors.mainColor};
  color: white;
  font-weight: 800;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: ${colors.gray700};
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RadioOption = styled.div`
  padding: 8px 14px;
  border: 1px solid #ddd;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? colors.mainColor : 'white')};
  color: ${({ isSelected }) => (isSelected ? 'white' : colors.gray700)};
  font-weight: 600;

  &:hover {
    background-color: ${colors.gray300};
    color: ${colors.gray900};
  }
`;

const project_status = ['ongoing', 'completed'];

const ProjectModal = ({ project, onSave, onClose }) => {
  const [name, setName] = useState(project ? project.name : '');
  const [description, setDescription] = useState(project ? project.description : '');
  // const [thumbnail, setThumbnail] = useState(project ? project.thumbnail : '');
  const [status, setStatus] = useState(project ? project.status : project_status[0]);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let projectData = {
      name,
      description,
      status,
      thumbnail: project ? project.thumbnail : 'gs://wellcomlab-70a36.appspot.com/project_thumbnails/default_project.png', // Default thumbnail URL
    };

    try {
      if (file) {
        const storage = getStorage();
        const fileRef = ref(storage, `project_thumbnails/${file.name}`);
        await uploadBytes(fileRef, file);
        const fileUrl = await getDownloadURL(fileRef);
        projectData.thumbnail = fileUrl;
      }

      if (project) {
        await updateDoc(doc(db, 'projects', project.id), projectData);
        onSave(true); // 업데이트 시 true 전달
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        onSave(false); // 추가 시 false 전달
      }
    } catch (error) {
      console.error('Error saving project: ', error);
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <Title>{project ? 'Edit Project' : 'Add Project'}</Title>
          <CancelButton onClick={onClose} />
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Project Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <RadioGroup>
              {project_status.map((stus) => (
                <RadioOption
                  key={stus}
                  isSelected={status === stus}
                  onClick={() => setStatus(stus)}
                >
                  {stus}
                </RadioOption>
              ))}
            </RadioGroup>
          </FormGroup>
          <FormGroup>
            <Label>Thumbnail</Label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </FormGroup>
          <ButtonGroup>
            <Button type="submit">{project ? '변경사항 저장하기' : 'Project 추가하기'}</Button>
          </ButtonGroup>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ProjectModal;
