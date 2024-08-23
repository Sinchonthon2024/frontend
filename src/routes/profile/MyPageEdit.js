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
  margin: 50px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const MyPageEdit = () => {
  const [nickname, setNickname] = useState('현재 닉네임');
  const [location, setLocation] = useState('현재 위치');
  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();
    // 서버로 수정된 데이터를 전송하는 코드 추가 필요
    console.log('닉네임:', nickname);
    console.log('위치:', location);

    // 저장 후 마이페이지로 돌아가기
    navigate('/mypage');
  };

  return (
    <Container>
      <Title>마이페이지</Title>
      <Form onSubmit={handleSave}>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <Label htmlFor="location">위치</Label>
        <Input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Button type="submit">수정 완료</Button>
      </Form>
    </Container>
  );
};

export default MyPageEdit;
