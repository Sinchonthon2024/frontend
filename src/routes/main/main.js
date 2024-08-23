import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Article from "../../components/article/Article"; // Article 컴포넌트 불러오기
import Post from "./Post"; // Importing the Post component

const Container = styled.div``;

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
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out,
    opacity 0.3s ease-in-out; /* Sliding and fade effects */
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
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("전체보기");
  const [navigatorStyle, setNavigatorStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });

  const tabsRef = useRef([]);

  const tabs = ["전체보기", "스터디", "문화", "취미", "여행", "음식"];

  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //       if (!accessToken) {
  //     try {
  //       const accessToken = localStorage.getItem("access_token");

  //         return;
  //         setError("로그인이 필요합니다.");
  //       }

  //       const response = await axios.get(
  //         "https://your-api-endpoint.com/api/posts",
  //         {
  //             Authorization: `Bearer ${accessToken}`,
  //           headers: {
  //           },
  //         }
  //       );

  //       const fetchedPosts = response.data.map((item) => ({
  //         id: item.id,
  //         category: item.post.category,
  //         title: item.post.title,
  //         dday: `D-${Math.ceil(
  //         imageUrl: item.post.image,
  //           (new Date(item.post.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  //         )}`,
  //         location: item.post.detail,
  //         author: item.user_name,
  //         participants: `0/${item.post.limit}`, // 예시로 설정한 인원 정보, 실제 데이터에 맞게 수정 필요
  //         date: item.date,

  //       }));
  //         likes: 0, // 예시로 설정한 좋아요 수, 실제 데이터에 맞게 수정 필요
  //     } catch (err) {
  //       setPosts(fetchedPosts);
  //       if (err.response && err.response.status === 400) {
  //       } else {
  //         setError(err.response.data.detail);
  // }, []);
  //   fetchPosts();

  //   };
  //     }
  //         setError("게시물을 불러오는 중 오류가 발생했습니다.");
  //       }
  // const posts = [
  //   {
  //     id: 1,
  //     title:
  //       "Study Post 1: This is a very long title that will be displayed in two lines",
  //     category: "스터디",
  //     imageUrl: "https://via.placeholder.com/150",
  //     dday: "D-3",
  //     location: "Seoul",
  //     author: "User1",
  //     date: "2024-08-20",
  //     participants: "5/10",
  //     likes: 23,
  //   },
  //   {
  //     id: 2,
  //     title:
  //       "Culture Post 1: Another example of a long title that needs to be truncated",
  //     category: "문화",
  //     imageUrl: "https://via.placeholder.com/150",
  //     dday: "D-10",
  //     location: "Busan",
  //     author: "User2",
  //     date: "2024-08-18",
  //     participants: "7/15",
  //     likes: 15,
  //   },
  //   {
  //     id: 3,
  //     title: "Hobby Post 1: Short and sweet title for a hobby post",
  //     category: "취미",
  //     imageUrl: "https://via.placeholder.com/150",
  //     dday: "D-5",
  //     location: "Incheon",
  //     author: "User3",
  //     date: "2024-08-22",
  //     participants: "2/5",
  //     likes: 8,
  //   },
  //   {
  //     id: 4,
  //     title: "Travel Post 1: Exploring the wonders of the world",
  //     category: "여행",
  //     imageUrl: "https://via.placeholder.com/150",
  //     dday: "D-2",
  //     location: "Jeju",
  //     author: "User4",
  //     date: "2024-08-19",
  //     participants: "10/10",
  //     likes: 45,
  //   },
  // ];
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          setError("로그인이 필요합니다.");
          return;
        }

        const response = await axios.get("https://your-api-endpoint.com/api/posts", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const fetchedPosts = response.data.map((item) => ({
          id: item.id,
          title: item.post.title,
          category: item.post.category,
          imageUrl: item.post.image,
          dday: `D-${Math.ceil(
            (new Date(item.post.deadline) - new Date()) / (1000 * 60 * 60 * 24)
          )}`,
          location: item.post.detail,
          author: item.user_name,
          date: item.date,
          participants: `0/${item.post.limit}`, // 예시로 설정한 인원 정보, 실제 데이터에 맞게 수정 필요
          likes: 0, // 예시로 설정한 좋아요 수, 실제 데이터에 맞게 수정 필요
        }));

        setPosts(fetchedPosts);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setError(err.response.data.detail);
        } else {
          setError("게시물을 불러오는 중 오류가 발생했습니다.");
        }
      }
    };

    fetchPosts();
  }, []);

  const updateNavigatorPosition = () => {
    const currentTab = tabsRef.current.find(
      (tab) => tab.textContent === activeTab
    );
    if (currentTab) {
      const navigatorWidth = currentTab.offsetWidth * 0.8; // Reduce width to 80% of the tab
      const navigatorLeft =
        currentTab.offsetLeft + (currentTab.offsetWidth - navigatorWidth) / 2; // Center align
      setNavigatorStyle({
        width: navigatorWidth,
        left: navigatorLeft,
        opacity: 1, // Make sure it starts visible when updating position
      });
    }
  };

  useEffect(() => {
    updateNavigatorPosition();

    // Add resize event listener
    window.addEventListener("resize", updateNavigatorPosition);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateNavigatorPosition);
    };
  }, [activeTab]);

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

      {error && <p>{error}</p>}

      <ArticleList>
        {filteredPosts.map((post) => (
          <Post
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
