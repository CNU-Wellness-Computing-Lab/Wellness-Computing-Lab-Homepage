import React, { useState } from 'react';
import styled from 'styled-components';
import { storage } from './Firebase';
import { colors } from '../assets/ui/styles';
import { Timestamp } from 'firebase/firestore';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
  margin: 0;
  flex-grow: 1;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 90px;
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
  justify-content: end;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 14px 22px;
  background-color: ${colors.mainColor};
  color: white;
  font-weight: 800;
  border: none;
  border-radius: 35px;
  font-size: 16px;  
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: ${colors.gray700};
  }
`;

const defaultImageUrls = [
  'gs://wellcomlab-70a36.appspot.com/news/default_news 1.png',
  'gs://wellcomlab-70a36.appspot.com/news/default_news 2.png',
  'gs://wellcomlab-70a36.appspot.com/news/default_news 3.png',
  
];

const getRandomDefaultProfileUrl = () => {
  const randomIndex = Math.floor(Math.random() * defaultImageUrls.length);
  return defaultImageUrls[randomIndex];
};

const NewsModal = ({ news, onSave, onClose }) => {
  const [title, setTitle] = useState(news ? news.title : '');
  const [date, setDate] = useState(news ? news.date.toDate().toISOString().split('T')[0] : ''); // Date 입력에 맞는 형식으로 변환
  const [content, setContent] = useState(news ? news.content : '');
  const [imageUrl] = useState(news ? news.imageUrl : '');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileUrlUploaded = imageUrl;

    if (file) {
      const storageRef = ref(storage, `news/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => reject(error),
          async () => {
            profileUrlUploaded = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    } else if (!imageUrl) {
      profileUrlUploaded = getRandomDefaultProfileUrl();
    }

    // 입력된 날짜가 없으면 오늘 날짜로 설정
    const newsDate = date ? new Date(date) : new Date();

    onSave({
      title,
      date: Timestamp.fromDate(newsDate), // Timestamp로 변환하여 저장
      content,
      imageUrl: profileUrlUploaded,
    });
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <Title>{news ? 'Edit News' : 'Add News'}</Title>
          <CancelButton onClick={onClose} />
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Image</Label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="submit">{news ? 'Save Changes' : 'Add News'}</Button>
          </ButtonGroup>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default NewsModal;