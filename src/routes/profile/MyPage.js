import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Post from "../main/Post"; // Importing the Post component
import img1 from "../../../src/assets/images/Rectangle10.jpg";
import img2 from "../../../src/assets/images/Rectangle11.jpg";
import img3 from "../../../src/assets/images/Rectangle12.jpg";
import img4 from "../../../src/assets/images/Rectangle13.jpg";
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
  background: #5e5ce6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
`;

const ArticleContainer = styled.div``;

const ArticleList = styled.div`
  width: 100%;
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  /* margin: 0 100px; */
`;

const MyPage = () => {
  const dummyPosts = [
    {
      id: 1,
      title: "영화 관람 하실분~",
      category: "스터디",
      imageUrl: img1,
      dday: "D-3",
      location: "Seoul",
      author: "User1",
      date: "2024-08-20",
      participants: "5/10",
      likes: 23,
    },
    {
      id: 2,
      title: "제주도 여행 8월. 일정 맞는 분들 함께 Go",
      category: "문화",
      imageUrl: img2,
      dday: "D-10",
      location: "Busan",
      author: "User2",
      date: "2024-08-18",
      participants: "7/15",
      likes: 15,
    },
    {
      id: 3,
      title: "뭉크 전시! 이것만을 알고가자!!!",
      category: "취미",
      imageUrl: img3,
      dday: "D-5",
      location: "Incheon",
      author: "User3",
      date: "2024-08-22",
      participants: "2/5",
      likes: 8,
    },
    {
      id: 4,
      title: "이제는 저도 작가랍니다",
      category: "여행",
      imageUrl: img4,
      dday: "D-2",
      location: "Jeju",
      author: "User4",
      date: "2024-08-19",
      participants: "10/10",
      likes: 45,
    },
  ];

  const [activeComponent, setActiveComponent] = useState("posts");
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handlePostClick = (id) => {
    navigate(`/main/post/${id}`);
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
        <ArticleContainer>
          {/* <p>여기에 내가 쓴 글 목록을 보여줍니다.</p> */}
          <ArticleList>
            {dummyPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onClick={() => handlePostClick(post.id)}
              />
            ))}
          </ArticleList>
        </ArticleContainer>
      )}

      {activeComponent === "info" && (
        <InfoContainer>
          <InfoItem>현재 닉네임</InfoItem>
          <InfoItem>현재 위치</InfoItem>
          <EditButton onClick={handleEditProfile}>
            내 정보 수정하러 가기
          </EditButton>
        </InfoContainer>
      )}
    </Container>
  );
};

export default MyPage;
