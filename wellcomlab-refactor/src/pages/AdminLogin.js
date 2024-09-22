import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../components/Firebase'; // Firebase 설정 파일에서 auth와 db를 가져옵니다.
import { DarkModeContext } from '../context/DarkModeContext';
import styled from 'styled-components';
import { colors } from '../assets/ui/styles';

// 컨테이너 스타일
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray100};
`;

const LoginForm = styled.form`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${colors.gray900};
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: ${colors.midgray};
  font-weight: 600;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  width: calc(100% - 22px); /* 100%에서 패딩과 보더 값을 뺀 너비 */
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${colors.mainColor};
  color: ${colors.white};
  font-weight: 900;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const Admin = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Firebase Authentication을 사용하여 로그인합니다.
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore에서 사용자의 역할을 가져옵니다.
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        setDarkMode(true);
        setIsLoggedIn(true);
        alert('Login successful!');
        navigate('/');
        window.location.reload();
      } else {
        alert('You do not have admin privileges.');
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Admin Login</Title>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </LoginForm>
    </Container>
  );
};

export default Admin;
