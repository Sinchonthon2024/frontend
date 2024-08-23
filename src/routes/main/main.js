// src/routes/main/main.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px 0;
  margin-bottom: 20px;
  background-color: #e5e5ff;
  position: relative;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  color: ${({ active }) => (active ? "#5856D6" : "#000")};
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  font-size: 18px;
  position: relative;
  margin: 0 5px;
  text-align: center;

  &:hover {
    color: #5856d6;
  }
`;

const Navigator = styled.div`
  position: absolute;
  bottom: 25px; /* Adjust for text gap */
  height: 2.5px;
  background-color: #5856d6;
  border-radius: 2px;
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out, opacity 0.3s ease-in-out; /* Sliding and fade effects */
  opacity: 0; /* Initial opacity */
`;

const InfoBar = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 50px 100px;
`;

const Info = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const Location = styled.div`
  font-size: 18px;
  color: #000; /* Default text color */
  margin-bottom: 5px; /* Add margin below the location text */
`;

const University = styled.div`
  font-size: 18px; /* Matching font size with Location */
  color: #000; /* Default text color */
  margin-top: 5px; /* Add margin above the university text */
`;

const Label = styled.span`
  color: #5e5ce6; /* Specific color for labels */
  letter-spacing: 2px; /* Increased letter spacing */
`;

const Text = styled.span`
  color: #000; /* Specific color for text */
  letter-spacing: 2px; /* Increased letter spacing */
`;

const WriteButton = styled.button`
  padding: 10px 20px;
  background-color: #5e5ce6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4d4bcf;
  }
`;

const ArticleList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin: 0 100px;
`;

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("전체보기");

  const tabs = ["전체보기", "스터디", "문화", "취미", "여행", "음식"];
  
  const posts = [
    {
      id: 1,
      title:
        "Study Post 1: This is a very long title that will be displayed in two lines",
      category: "스터디",
      imageUrl: "https://via.placeholder.com/150",
      dday: "D-3",
      location: "Seoul",
      author: "User1",
      date: "2024-08-20",
      participants: "5/10",
      likes: 23,
    },
    {
      id: 2,
      title:
        "Culture Post 1: Another example of a long title that needs to be truncated",
      category: "문화",
      imageUrl: "https://via.placeholder.com/150",
      dday: "D-10",
      location: "Busan",
      author: "User2",
      date: "2024-08-18",
      participants: "7/15",
      likes: 15,
    },
    {
      id: 3,
      title: "Hobby Post 1: Short and sweet title for a hobby post",
      category: "취미",
      imageUrl: "https://via.placeholder.com/150",
      dday: "D-5",
      location: "Incheon",
      author: "User3",
      date: "2024-08-22",
      participants: "2/5",
      likes: 8,
    },
    {
      id: 4,
      title: "Travel Post 1: Exploring the wonders of the world",
      category: "여행",
      imageUrl: "https://via.placeholder.com/150",
      dday: "D-2",
      location: "Jeju",
      author: "User4",
      date: "2024-08-19",
      participants: "10/10",
      likes: 45,
    },
    {
      id: 5,
      title: "Food Post 1: Discovering the best dishes around the city",
      category: "음식",
      imageUrl: "https://via.placeholder.com/150",
      dday: "D-7",
      location: "Daegu",
      author: "User5",
      date: "2024-08-21",
      participants: "3/8",
      likes: 18,
    },
    {
      id: 6,
      title: "Study Post 2: Another study session with a focus on efficiency",
      category: "스터디",
      imageUrl: "https://via.placeholder.com/150",
      dday: "D-1",
      location: "Seoul",
      author: "User6",
      date: "2024-08-23",
      participants: "8/12",
      likes: 32,
    },
    {
      id: 7,
      title: "Culture Post 2: A deep dive into the history and culture of the region",
      category: "문화",
      imageUrl: "https://via.placeholder.com/150",
      dday: "D-4",
      location: "Gwangju",
      author: "User7",
      date: "2024-08-17",
      participants: "6/10",
      likes: 27,
    },
    {
      id: 8,
      title: "Travel Post 2: Unforgettable experiences in faraway places",
      category: "여행",
      imageUrl: "https://via.placeholder.com/150",
      dday: "D-6",
      location: "Gangwon",
      author: "User8",
      date: "2024-08-15",
      participants: "5/5",
      likes: 52,
    },
  ];

  const filteredPosts = activeTab === "전체보기"
    ? posts
    : posts.filter(post => post.category === activeTab);

  const handlePostClick = (id) => {
    navigate(`/main/post/${id}`);
  };

  const handleWriteClick = () => {
    navigate("/post");
  };

  return (
    <Container>
      <Tabs>
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            active={tab === activeTab}
            onClick={() => setActiveTab(tab)}
            ref={(el) => (tabsRef.current[index] = el)}
          >
            {tab}
          </Tab>
        ))}
        <Navigator style={navigatorStyle} />
      </Tabs>

      <InfoBar>
        <Info>
          <Location>
            <Label>현재 위치 |</Label> <Text>서울</Text>
          </Location>
          <University>
            <Label>연결 가능 대학 |</Label> <Text>서울대학교</Text>
          </University>
        </Info>
        <WriteButton onClick={handleWriteClick}>글쓰기</WriteButton>
      </InfoBar>

      <PostList>
        {filteredPosts.map((post) => (
          <Post key={post.id} onClick={() => handlePostClick(post.id)}>
            <PostImage src={post.imageUrl} alt={post.title} />
            <PostDetails>
              <DDay>{post.dday}</DDay>
              <LocationDetail>{post.location}</LocationDetail>
            </PostDetails>
            <Title>{post.title}</Title>
            <Author>작성자: {post.author}</Author>
            <Date>작성일: {post.date}</Date>
            <PostFooter>
              <Participants>인원: {post.participants}</Participants>
              <Likes>
                <HeartIcon>❤️</HeartIcon>
                {post.likes}
              </Likes>
            </PostFooter>
          </Post>
        ))}
      </ArticleList>
    </Container>
  );
};

export default Main;
