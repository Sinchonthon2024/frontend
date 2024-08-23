import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: transparent;
`;

const Title = styled.h2`
  margin: 50px 0;
  color: #000;
  font-size: 36px;
  font-weight: 700;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: solid 1px #c6c6c8;
`;

const Button = styled.button`
  padding: 10px 10px;
  background-color: transparent;
  color: ${(props) => (props.active ? "#5E5CE6" : "#000")};
  border: none;
  border-bottom: ${(props) => (props.active ? "3px solid #5E5CE6" : "none")};
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : 400)};

  &:hover {
    background-color: ${(props) => (props.active ? "transparent" : "#f0f0f0")};
  }
`;

const InfoContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const InfoItem = styled.div`
  margin-bottom: 30px;
  font-size: 16px;
  background-color: #f5f5fa;
  width: 100%;
  height: 64px;
  border-radius: 8px;
`;

const EditButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #5E5CE6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
`;

const MyPage = () => {
  const [activeComponent, setActiveComponent] = useState("posts");
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  return (
    <Container>
      <Title>마이페이지</Title>
      <ButtonGroup>
        <Button
          active={activeComponent === "posts"}
          onClick={() => setActiveComponent("posts")}
        >
          내가 쓴 글
        </Button>
        <Button
          active={activeComponent === "info"}
          onClick={() => setActiveComponent("info")}
        >
          내 정보
        </Button>
      </ButtonGroup>

      {activeComponent === "posts" && (
        <div>
          <p>여기에 내가 쓴 글 목록을 보여줍니다.</p>
          {/* 내가 쓴 글 리스트 컴포넌트 추가 */}
        </div>
      )}

      {activeComponent === "info" && (
        <InfoContainer>
          <InfoItem>현재 닉네임</InfoItem>
          <InfoItem>현재 위치</InfoItem>
          <EditButton onClick={handleEditProfile}>내 정보 수정하러 가기</EditButton>
        </InfoContainer>
      )}
    </Container>
  );
};

export default MyPage;
