import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../components/Firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
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
  margin: 0;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: ${colors.midgray};
  font-weight: 600;
  font-size: 14px;
  width: 90px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  flex-grow: 1;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  flex-grow: 1;
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

const categories = ['Conference', 'Journal', 'Poster', 'Other'];

const PublicationModal = ({ publication, onSave, onClose }) => {
  const [title, setTitle] = useState(publication ? publication.title : '');
  const [authors, setAuthors] = useState(publication ? publication.authors : '');
  const [category, setCategory] = useState(publication ? publication.category : 'Conference');
  const [institution, setInstitution] = useState(publication ? publication.institution : '');
  const [pdfUrl, setPdfUrl] = useState(publication ? publication.pdfUrl : '');
  const [year, setYear] = useState(publication ? publication.year : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const publicationData = {
      title,
      authors,
      category,
      institution,
      pdfUrl,
      year,
    };

    try {
      if (publication) {
        await updateDoc(doc(db, 'publications', publication.id), publicationData);
      } else {
        await addDoc(collection(db, 'publications'), publicationData);
      }
      onSave(publicationData); // onSave 호출 시 publicationData 전달
    } catch (error) {
      console.error('Error saving publication: ', error);
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <Title>{publication ? 'Edit Publication' : 'Add Publication'}</Title>
          <CancelButton onClick={onClose} />
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Authors</Label>
            <Textarea
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Category</Label>
            <RadioGroup>
              {categories.map((cat) => (
                <RadioOption
                  key={cat}
                  isSelected={category === cat}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </RadioOption>
              ))}
            </RadioGroup>
          </FormGroup>
          <FormGroup>
            <Label>Institution</Label>
            <Input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>PDF URL</Label>
            <Input
              type="url"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Year</Label>
            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </FormGroup>
          <ButtonGroup>
             <Button type="submit">{publication ? '업데이트 하기' : 'Publication 추가하기'}</Button>
          </ButtonGroup>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default PublicationModal;
