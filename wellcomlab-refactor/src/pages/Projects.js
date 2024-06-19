import React from 'react';
import styled from 'styled-components';

// 컨테이너 스타일
const Container = styled.div`
  width: 100vw;
  padding: 30px 20px;
  box-sizing: border-box;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: pink;
`;


function Projects() {
  return (
    <Container>
      <h1>Welcome to the Projects Page</h1>
      <p>This is the Projects page of our React application.</p>
    </Container>
  );
}

export default Projects;
