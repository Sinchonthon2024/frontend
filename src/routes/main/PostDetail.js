import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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
  background-color: #007bff;
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
  background-color: #ff4757;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
`;

const Status = styled.div`
  font-size: 16px;
  color: #007bff;
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
  max-width: 500px;
  height: auto;
  max-height: 300px;
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

const PostDetail = () => {
  const { id } = useParams();

  const post = {
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
    content: "This is the content of the post. It describes the details of the travel experience.",
    openChatLink: "https://openchat.example.com",
    deadline: "2024-08-30",
  };

  const comments = [
    {
      id: 1,
      author: "CommentUser1",
      content: "This is a comment on the post.",
      date: "2024-08-16",
    },
    {
      id: 2,
      author: "CommentUser2",
      content: "Another comment here!",
      date: "2024-08-17",
    },
  ];

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Button>수정</Button>
          <Button>삭제</Button>
        </Header>

        <InfoRow>
          <DDayStatus>
            <DDay>{post.dday}</DDay>
            <Status>모집 중</Status>
          </DDayStatus>
        </InfoRow>

        <InfoRow>
          <CategoryLocation>{post.category} • {post.location}</CategoryLocation>
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
        <Content>{post.content}</Content>

        <OpenChatTitle>오픈채팅방 링크</OpenChatTitle>
        <OpenChatLink href={post.openChatLink} target="_blank" rel="noopener noreferrer">
          {post.openChatLink}
        </OpenChatLink>

        <DeadlineTitle>마감일</DeadlineTitle>
        <DeadlineDate>{formatDate(post.deadline)}</DeadlineDate>
      </ContentWrapper>

      <CommentsHeader>
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
      ))}
    </Container>
  );
};

export default PostDetail;