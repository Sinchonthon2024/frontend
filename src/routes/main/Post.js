import React from "react";
import styled from "styled-components";

const PostContainer = styled.div`
  background-color: #f5f5ff; /* Updated background color */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    transform: translateY(-3%);
    transition: transform 0.2s ease-in;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const PostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DDay = styled.div`
  color: #fff; /* Text color white */
  background-color: #5e5ce6; /* Updated background color */
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: normal; /* Removed bold font */
`;

const LocationDetail = styled.div`
  color: #000; /* Updated text color */
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 1.4;
  color: #000; /* Updated text color */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author = styled.div`
  font-size: 14px;
  color: #000; /* Updated text color */
  margin-bottom: 5px;
`;

const Date = styled.div`
  font-size: 12px;
  color: #000; /* Updated text color */
  margin-bottom: 10px;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Participants = styled.div`
  font-size: 12px;
  color: #000; /* Updated text color */
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #000; /* Updated text color */
`;

const HeartIcon = styled.span`
  color: #ff4757;
  margin-right: 5px;
`;

const Post = ({ post, onClick }) => {
  return (
    <PostContainer onClick={onClick}>
      <PostImage src={post.imageUrl} alt={post.title} />
      <PostDetails>
        <DDay>{post.dday}</DDay>
        <LocationDetail>{post.location}</LocationDetail>
      </PostDetails>
      <Title>{post.title}</Title>
      <Author>{post.author}</Author>
      <Date>{post.date}</Date>
      <PostFooter>
        <Participants>인원: {post.participants}</Participants>
        <Likes>
          <HeartIcon>❤️</HeartIcon>
          {post.likes}
        </Likes>
      </PostFooter>
    </PostContainer>
  );
};

export default Post;
