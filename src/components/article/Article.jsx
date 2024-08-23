import React from "react";
import styled from "styled-components";

const ArticleContainer = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ArticleDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DDay = styled.div`
  color: #fff;
  background-color: #ff4757;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
`;

const LocationDetail = styled.div`
  color: #555;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
`;

const Date = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-bottom: 10px;
`;

const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Participants = styled.div`
  font-size: 12px;
  color: #555;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #555;
`;

const HeartIcon = styled.span`
  color: #ff4757;
  margin-right: 5px;
`;

const Article = ({ post, onClick }) => {
  return (
    <ArticleContainer onClick={onClick}>
      <ArticleImage src={post.imageUrl} alt={post.title} />
      <ArticleDetails>
        <DDay>{post.dday}</DDay>
        <LocationDetail>{post.location}</LocationDetail>
      </ArticleDetails>
      <Title>{post.title}</Title>
      <Author>작성자: {post.author}</Author>
      <Date>작성일: {post.date}</Date>
      <ArticleFooter>
        <Participants>인원: {post.participants}</Participants>
        <Likes>
          <HeartIcon>❤️</HeartIcon>
          {post.likes}
        </Likes>
      </ArticleFooter>
    </ArticleContainer>
  );
};

export default Article;
