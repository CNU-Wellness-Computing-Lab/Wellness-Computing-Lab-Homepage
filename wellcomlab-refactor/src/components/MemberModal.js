import React, { useState } from 'react';
import styled from 'styled-components';
import { storage } from './Firebase';
import { colors } from '../assets/ui/styles';
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
  width: 800px;
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

const degrees = ['Faculty', 'Ph.D. Student', "Master's Student", 'Undergraduate Intern'];
const isActives = [true, false];

const defaultProfileUrls = [
  'gs://wellcomlab-70a36.appspot.com/members/default_profile 1.png',
  'gs://wellcomlab-70a36.appspot.com/members/default_profile 2.png',
  'gs://wellcomlab-70a36.appspot.com/members/default_profile 3.png',
  'gs://wellcomlab-70a36.appspot.com/members/default_profile 4.png',
  'gs://wellcomlab-70a36.appspot.com/members/default_profile 5.png',
  'gs://wellcomlab-70a36.appspot.com/members/default_profile 6.png',
];

const getRandomDefaultProfileUrl = () => {
  const randomIndex = Math.floor(Math.random() * defaultProfileUrls.length);
  return defaultProfileUrls[randomIndex];
};

const MemberModal = ({ member, onSave, onClose }) => {
  const [name, setName] = useState(member ? member.name : '');
  const [researchField, setResearchField] = useState(member ? member.researchField.join(', ') : '');
  const [degree, setDegree] = useState(member ? member.degree : degrees[3]);
  const [isActive, setIsActive] = useState(member ? member.isActive : isActives[0]);
  const [email, setEmail] = useState(member ? member.email : '');
  const [github, setGithub] = useState(member ? member.github : '');
  const [linkedin, setLinkedin] = useState(member ? member.linkedin : '');
  const [profileUrl, setProfileUrl] = useState(member ? member.profileUrl : '');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileUrlUploaded = profileUrl;

    if (file) {
      const storageRef = ref(storage, `profiles/${file.name}`);
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
    } else if (!profileUrl) {
      profileUrlUploaded = getRandomDefaultProfileUrl();
    }

    const researchFieldList = researchField
      ? researchField.split(',').map((field) => field.trim())
      : ['HCI'];

    onSave({
      name,
      researchField: researchFieldList,
      degree,
      isActive: isActive,
      email,
      github,
      linkedin,
      profileUrl: profileUrlUploaded,
    });
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <Title>{member ? 'Edit Member' : 'Add Member'}</Title>
          <CancelButton onClick={onClose} />
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>이름</Label>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>관심분야</Label>
            <Textarea
              placeholder="Research Fields (comma separated)"
              value={researchField}
              onChange={(e) => setResearchField(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>학위</Label>
            <RadioGroup>
              {degrees.map((deg) => (
                <RadioOption
                  key={deg}
                  isSelected={degree === deg}
                  onClick={() => setDegree(deg)}
                >
                  {deg}
                </RadioOption>
              ))}
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>상태</Label>
            <RadioGroup>
              {isActives.map((status) => (
                <RadioOption
                  key={status}
                  isSelected={isActive === status}
                  onClick={() => setIsActive(status)}
                >
                  {status ? 'Active' : 'Inactive'}
                </RadioOption>
              ))}
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>메일 주소</Label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>깃 주소</Label>
            <Input
              type="text"
              placeholder="GitHub"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>링크드인 주소</Label>
            <Input
              type="text"
              placeholder="LinkedIn"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>프로필 사진</Label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="submit">{member ? '변경사항 저장하기' : '새 멤버 추가하기'}</Button>
          </ButtonGroup>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default MemberModal;