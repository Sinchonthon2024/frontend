import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Article from "../../components/article/Article"; // Article 컴포넌트 불러오기

const Container = styled.div`
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  color: ${({ active }) => (active ? "#007bff" : "#000")};
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? "2px solid #007bff" : "none")};
  margin: 0 5px;

  &:hover {
    color: #007bff;
  }
`;

const InfoBar = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
`;

const Info = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const Location = styled.div`
  font-size: 18px;
  color: #555;
`;

const University = styled.div`
  font-size: 16px;
  color: #007bff;
  margin-top: 5px;
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
`;

const Main = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("전체보기");
  // const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const tabs = ["전체보기", "스터디", "문화", "취미", "여행", "음식"];

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const accessToken = localStorage.getItem("access_token");

  //       if (!accessToken) {
  //         setError("로그인이 필요합니다.");
  //         return;
  //       }

  //       const response = await axios.get(
  //         "https://your-api-endpoint.com/api/posts",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );

  //       const fetchedPosts = response.data.map((item) => ({
  //         id: item.id,
  //         title: item.post.title,
  //         category: item.post.category,
  //         imageUrl: item.post.image,
  //         dday: `D-${Math.ceil(
  //           (new Date(item.post.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  //         )}`,
  //         location: item.post.detail,
  //         author: item.user_name,
  //         date: item.date,
  //         participants: `0/${item.post.limit}`, // 예시로 설정한 인원 정보, 실제 데이터에 맞게 수정 필요
  //         likes: 0, // 예시로 설정한 좋아요 수, 실제 데이터에 맞게 수정 필요
  //       }));

  //       setPosts(fetchedPosts);
  //     } catch (err) {
  //       if (err.response && err.response.status === 400) {
  //         setError(err.response.data.detail);
  //       } else {
  //         setError("게시물을 불러오는 중 오류가 발생했습니다.");
  //       }
  //     }
  //   };

  //   fetchPosts();
  // }, []);
  // 더미 데이터
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
      title:
        "Culture Post 2: A deep dive into the history and culture of the region",
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

  const filteredPosts =
    activeTab === "전체보기"
      ? posts
      : posts.filter((post) => post.category === activeTab);

  const handlePostClick = (id) => {
    navigate(`/main/post/${id}`);
  };

  const handleWriteClick = () => {
    navigate("/post");
  };

  return (
    <Container>
      <Tabs>
        {tabs.map((tab) => (
          <Tab
            key={tab}
            active={tab === activeTab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>

      <InfoBar>
        <Info>
          <Location>현재 위치: 서울</Location>
          <University>연결 가능 대학: 서울대학교</University>
        </Info>
        <WriteButton onClick={handleWriteClick}>글쓰기</WriteButton>
      </InfoBar>

      {error && <p>{error}</p>}

      <ArticleList>
        {filteredPosts.map((post) => (
          <Article
            key={post.id}
            post={post}
            onClick={() => handlePostClick(post.id)}
          />
        ))}
      </ArticleList>
    </Container>
  );
};

export default Main;
