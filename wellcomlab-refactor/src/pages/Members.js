import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../components/Firebase';
import MemberCard from '../components/MemberCard';
import MemberModal from '../components/MemberModal';
import AddCloudIcon from '../assets/icons/icon_cloud_upload.png';
import { colors, media } from '../assets/ui/styles';

const Container = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 60px 20px 30px;
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

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  justify-items: center;
  width: 100%;
  grid-gap: 10px;

  ${media.mobile`
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  `}
  
`;

const SectionTitle = styled.h2`
  margin-top: 40px;
  font-size: 24px;
  color: ${colors.mainColor};
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  position: relative;
  margin-bottom: 0px;
  margin-top: 10px;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    height: 2px;
    background-color: rgba(${colors.mainColorRGB}, 0.2);
  }

  &::before {
    margin-right: 16px;
  }

  &::after {
    margin-left: 16px;
  }
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

const degrees = ['Faculty', 'Ph.D. Student', "Master's Student", 'Undergraduate Intern'];

function Members({ isLoggedIn }) {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'members'));
        const membersData = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const id = doc.id;
          if (data.profileUrl) {
            const storage = getStorage();
            const profileRef = ref(storage, data.profileUrl);
            const profileUrl = await getDownloadURL(profileRef);
            return { ...data, profileUrl, id };
          }
          return { ...data, id };
        }));

        setMembers(membersData);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  // 멤버 추가 버튼 클릭 시 모달을 엽니다.
  const handleAddMember = (event) => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  // 멤버 편집 버튼 클릭 시 모달을 엽니다.
  const handleEditMember = (event, member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  // 멤버 삭제
  const handleDeleteMember = async (memberId) => {
    const confirmDelete = window.confirm('정말 이 멤버를 삭제하시겠습니까?');
    
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'members', memberId));
        setMembers(members.filter((member) => member.id !== memberId));
        alert('Member 삭제 완료');
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    } 
  };

  // 멤버 저장
  const handleSaveMember = async (member) => {
    if (selectedMember) {
      await updateDoc(doc(db, 'members', selectedMember.id), member);
      alert('Member 정보 업데이트 완료');
      
      // 상태 업데이트
      setMembers((prevMembers) =>
        prevMembers.map((m) => (m.id === selectedMember.id ? { ...m, ...member } : m))
      );
    } else {
      const docRef = await addDoc(collection(db, 'members'), member);
      member.id = docRef.id;
      setMembers([...members, member]);
      alert('Member 추가 완료');
    }
    setIsModalOpen(false); // 모달 닫기
    setSelectedMember(null); // 선택된 멤버 초기화
  };

  const activeMembersByDegree = degrees.map(degree => ({
    degree,
    members: members.filter(member => member.isActive && member.degree === degree),
  }));

  const alumniMembers = members.filter(member => !member.isActive);

  return (
    <Background>
      <Container>
        {isLoggedIn && (
          <>
            <AddButton onClick={handleAddMember}>
              <AddIcon src={AddCloudIcon} alt="add icon" />
              Add Member
            </AddButton>
            {isModalOpen && (
              <MemberModal
                member={selectedMember}
                onSave={handleSaveMember}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </>
        )}

        {/* Active Members Sectioned by Degree */}
        {activeMembersByDegree.map(({ degree, members }) => (
          <React.Fragment key={degree}>
            {members.length > 0 && (
              <>
                <SectionTitle>{degree}</SectionTitle>
                <MemberGrid>
                  {members.map((member, index) => (
                    <MemberCard
                      key={index}
                      member={member}
                      onEdit={(e) => handleEditMember(e, member)}
                      onDelete={() => handleDeleteMember(member.id)}
                      isLoggedIn={isLoggedIn}
                    />
                  ))}
                </MemberGrid>
              </>
            )}
          </React.Fragment>
        ))}

        {/* Alumni Members */}
        <SectionTitle>Alumni</SectionTitle>
        <MemberGrid>
          {alumniMembers.map((member, index) => (
            <MemberCard
              key={index}
              member={member}
              onEdit={(e) => handleEditMember(e, member)}
              onDelete={() => handleDeleteMember(member.id)}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </MemberGrid>
      </Container>
    </Background>
  );
}

export default Members;