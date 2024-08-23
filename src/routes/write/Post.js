import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import imageLogo from '../../assets/images/write/imageLogo.svg';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: transparent;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const OptionalText = styled.span`
  color: #666;
  font-size: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "#007bff" : "#e0e0e0")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#ccc")};
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const ImageUploadContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  color: #3C3C4399;
  font-size: 15px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImageButton = styled.button`
  background: url(${imageLogo}) no-repeat center center;
  background-size: cover;
  width: 30px;
  height: 30px;
  margin: 10px;
  border: none;
  cursor: pointer;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function Post() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState(null);
  const [chatLink, setChatLink] = useState("");

  const subCategoryOptions = {
    socialing: ["스터디", "문화", "취미", "여행", "음식"],
    sharing: ["생활용품", "음식", "가구"],
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSubCategory(""); // Reset sub-category when main category changes
  };

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("mainCategory", selectedCategory);
    formData.append("subCategory", subCategory);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("deadline", deadline);
    if (image) {
      formData.append("image", image);
    }
    formData.append("chatLink", chatLink);

    try {
      const response = await axios.post(
        "https://your-server-endpoint.com/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created successfully:", response.data);
    } catch (error) {
      console.error("There was an error creating the post!", error);
    }
  };

  return (
    <Container>
      <Title>글쓰기</Title>
      <form onSubmit={handleSubmit}>
        <LabelContainer>
          <Label>메인 카테고리</Label>
          <OptionalText>필수</OptionalText>
        </LabelContainer>
        <ButtonGroup>
          <Button
            active={selectedCategory === "socialing"}
            onClick={() => handleCategoryChange("socialing")}
            type="button"
          >
            소셜링
          </Button>
          <Button
            active={selectedCategory === "sharing"}
            onClick={() => handleCategoryChange("sharing")}
            type="button"
          >
            셰어링
          </Button>
        </ButtonGroup>

        <LabelContainer>
          <Label htmlFor="subCategory">세부 카테고리</Label>
          <OptionalText>필수</OptionalText>
        </LabelContainer>
        <Select
          id="subCategory"
          name="subCategory"
          required
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          disabled={!selectedCategory} // Disable if no main category is selected
        >
          <option value="">선택하세요</option>
          {selectedCategory &&
            subCategoryOptions[selectedCategory].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </Select>

        <LabelContainer>
          <Label htmlFor="title">제목</Label>
          <OptionalText>필수</OptionalText>
        </LabelContainer>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="제목을 입력하세요"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <LabelContainer>
          <Label htmlFor="content">내용</Label>
          <OptionalText>필수</OptionalText>
        </LabelContainer>
        <Textarea
          id="content"
          name="content"
          rows="6"
          placeholder="내용을 입력하세요"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></Textarea>

        <LabelContainer>
          <Label htmlFor="deadline">마감일</Label>
          <OptionalText>필수</OptionalText>
        </LabelContainer>
        <Input
          id="deadline"
          name="deadline"
          type="date"
          required
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <LabelContainer>
          <Label htmlFor="image">이미지 첨부</Label>
          <OptionalText>선택</OptionalText>
        </LabelContainer>
        <ImageUploadContainer>
          <HiddenFileInput
            id="imageInput"
            type="file"
            onChange={handleImageChange}
          />
          <ImageButton onClick={handleImageClick} />
          클릭하여 이미지 첨부
        </ImageUploadContainer>

        <LabelContainer>
          <Label htmlFor="chatLink">오픈채팅방 링크</Label>
          <OptionalText>선택</OptionalText>
        </LabelContainer>
        <Input
          id="chatLink"
          name="chatLink"
          type="url"
          placeholder="https://open.kakao.com/o/example"
          value={chatLink}
          onChange={(e) => setChatLink(e.target.value)}
        />

        <SubmitButton type="submit">확인</SubmitButton>
      </form>
    </Container>
  );
}

export default Post;
