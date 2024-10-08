import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import img1 from "../../../src/assets/images/Rectangle10.jpg";
import img2 from "../../../src/assets/images/Rectangle11.jpg";
import img3 from "../../../src/assets/images/Rectangle12.jpg";
import img4 from "../../../src/assets/images/Rectangle13.jpg";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #5856d6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const DDayStatus = styled.div`
  display: flex;
  align-items: center;
`;

const DDay = styled.div`
  color: #fff;
  background-color: #5856d6;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
`;

const Status = styled.div`
  font-size: 16px;
  color: #5856d6;
  margin-left: 10px;
`;

const CategoryLocation = styled.div`
  font-size: 16px;
  color: #555;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #555;
`;

const HeartIcon = styled.span`
  color: #ff4757;
  margin-right: 5px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 40px;
`;

const SubInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Author = styled.div`
  font-size: 16px;
  color: #888;
`;

const Participants = styled.div`
  font-size: 16px;
  color: #555;
`;

const Date = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 30px;
`;

const Image = styled.img`
  width: 100%;
  /* max-width: 500px; */
  height: auto;
  /* max-height: 300px; */
  border-radius: 8px;
  margin-bottom: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const ContentTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 40px;
`;

const OpenChatTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const OpenChatLink = styled.a`
  font-size: 16px;
  color: #007bff;
  margin-bottom: 40px;
  display: block;
`;

const DeadlineTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const DeadlineDate = styled.div`
  font-size: 16px;
  color: #333;
`;

const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CommentsTitle = styled.h3`
  font-weight: bold;
  font-size: 20px;
`;

const CommentCount = styled.span`
  font-size: 18px;
  color: #555;
  margin-left: 10px;
`;

const CommentButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const CommentWrapper = styled(ContentWrapper)`
  padding: 20px;
  margin-bottom: 10px;
`;

const CommentRow = styled.div`
  display: flex;
  align-items: baseline; /* Align items based on the baseline */
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CommentAuthor = styled.div`
  font-size: 16px;
  color: #555;
  font-weight: bold;
`;

const CommentContentWrapper = styled.div`
  flex: 1;
`;

const CommentContent = styled.div`
  font-size: 16px;
  color: #333;
  margin-left: 10px;
`;

const CommentDate = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-top: 5px;
  margin-left: 10px; /* Align with CommentContent */
`;

// 날짜 형식을 YYYY.MM.DD로 포맷팅하는 함수
const formatDate = (dateStr) => {
  const dateObj = new window.Date(dateStr);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

// Main 컴포넌트의 더미 데이터
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

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 더미 데이터를 사용하여 포스트를 검색
    const fetchedPost = dummyPosts.find((p) => p.id === parseInt(id));
    if (fetchedPost) {
      setPost(fetchedPost);
    } else {
      setError("해당 게시물을 찾을 수 없습니다.");
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/post/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      // 삭제 로직은 실제 구현에 따라 다름
      navigate("/main");
    } catch (err) {
      setError("게시물을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Button onClick={handleEdit}>수정</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </Header>

        <InfoRow>
          <DDayStatus>
            <DDay>{post.dday}</DDay>
            <Status>모집 중</Status>
          </DDayStatus>
        </InfoRow>

        <InfoRow>
          <CategoryLocation>
            {post.category} • {post.location}
          </CategoryLocation>
          <Likes>
            <HeartIcon>❤️</HeartIcon>
            {post.likes}
          </Likes>
        </InfoRow>

        <Title>{post.title}</Title>

        <SubInfoRow>
          <Author>작성자: {post.author}</Author>
          <Participants>모집인원: {post.participants}</Participants>
        </SubInfoRow>

        <Date>작성일: {formatDate(post.date)}</Date>

        <Image src={post.imageUrl} alt={post.title} />

        <ContentTitle>본문 내용</ContentTitle>
        <Content>여기에 게시물의 본문 내용이 표시됩니다.</Content>

        {post.link && (
          <>
            <OpenChatTitle>오픈채팅방 링크</OpenChatTitle>
            <OpenChatLink
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.link}
            </OpenChatLink>
          </>
        )}

        <DeadlineTitle>마감일</DeadlineTitle>
        <DeadlineDate>{formatDate(post.date)}</DeadlineDate>
      </ContentWrapper>

      {/* <CommentsHeader>
        <CommentsTitle>
          댓글 <CommentCount>{comments.length}</CommentCount>
        </CommentsTitle>
        <CommentButton>댓글 작성</CommentButton>
      </CommentsHeader>

      {comments.map((comment) => (
        <CommentWrapper key={comment.id}>
          <CommentRow>
            <CommentAuthor>{comment.author}</CommentAuthor>
            <CommentContentWrapper>
              <CommentContent>{comment.content}</CommentContent>
              <CommentDate>작성일: {formatDate(comment.date)}</CommentDate>
            </CommentContentWrapper>
          </CommentRow>
        </CommentWrapper>
      ))} */}
    </Container>
  );
};

export default PostDetail;
