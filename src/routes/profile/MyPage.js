import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: transparent;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: solid 1px #C6C6C8;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  color: ${props => (props.active ? '#007bff' : '#333')};
  border: none;
  border-bottom: ${props => (props.active ? '3px solid #007bff' : 'none')};
  cursor: pointer;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  
  &:hover {
    background-color: ${props => (props.active ? 'transparent' : '#f0f0f0')};
  }
`;

const InfoContainer = styled.div`
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const MyPage = () => {
  const [activeComponent, setActiveComponent] = useState('posts');
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  return (
    <Container>
      <Title>마이페이지</Title>
      <ButtonGroup>
        <Button active={activeComponent === 'posts'} onClick={() => setActiveComponent('posts')}>
          내가 쓴 글
        </Button>
        <Button active={activeComponent === 'info'} onClick={() => setActiveComponent('info')}>
          내 정보
        </Button>
      </ButtonGroup>

      {activeComponent === 'posts' && (
        <div>
          <p>여기에 내가 쓴 글 목록을 보여줍니다.</p>
          {/* 내가 쓴 글 리스트 컴포넌트 추가 */}
        </div>
      )}

      {activeComponent === 'info' && (
        <InfoContainer>
          <InfoItem>닉네임: 현재 닉네임</InfoItem>
          <InfoItem>설정된 위치: 현재 위치</InfoItem>
          <EditButton onClick={handleEditProfile}>수정하기</EditButton>
        </InfoContainer>
      )}
    </Container>
  );
};

export default MyPage;
