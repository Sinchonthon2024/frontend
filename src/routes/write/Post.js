import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import imageLogo from "../../assets/images/write/imageLogo.svg";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: transparent;
`;

const Title = styled.h2`
  text-align: center;
  color: #000;
  margin: 50px 0;
  font-size: 36px;
  font-weight: 700;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: #4B4B4B;
`;

const RequiredText = styled.span`
  color: #5E5CE6;
  font-size: 14px;
  font-weight: 500;
`;

const OptionalText = styled.span`
  color: rgba(60, 60, 67, 0.60);
  font-size: 14px;
  font-weight: 500;
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
  border: ${(props) => (props.active ? "2px solid #5E5CE6" : "none")};
  color: ${(props) => (props.active ? "#5E5CE6" : "rgba(60, 60, 67, 0.60)")};
  cursor: pointer;
  border-radius: 8px;
  background-color: #f5f5fa;

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
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 8px;
  color: #3c3c4399;
  font-size: 15px;
  background-color: #f5f5fa;
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
  border: 1px transparent;
  border-radius: 8px;
  background-color: #F5F5FA;

  option[value=""] {
    color: rgba(60, 60, 67, 0.60);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: #f5f5fa;

  ::placeholder {
    color: rgba(60, 60, 67, 0.60); /* placeholder 텍스트 색상 */
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid transparent;
  border-radius: 8px;
  resize: vertical;
  background-color: #f5f5fa;

  ::placeholder {
    color: rgba(60, 60, 67, 0.60); /* placeholder 텍스트 색상 */
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #5E5CE6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

function Post() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [limit, setLimit] = useState("");
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

    // localStorage에서 access_token 가져오기
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("Access token is missing. Please log in again.");
      return; // access_token이 없을 경우 요청을 보내지 않음
    }

    const formData = new FormData();
    formData.append("category", selectedCategory);
    formData.append("detail", subCategory);
    formData.append("title", title);
    formData.append("text", content);
    formData.append("limit", limit);
    formData.append("link", chatLink);
    formData.append("deadline", deadline);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "https://your-server-endpoint.com/api/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created successfully:", response.data);

      // 성공 시 response에서 id와 date를 받아 처리할 수 있습니다.
      const { user_name, id, date, post } = response.data;
      console.log("User Name:", user_name);
      console.log("Created Post ID:", id);
      console.log("Creation Date:", date);
      console.log("Post Details:", post);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error:", error.response.data.detail);
      } else {
        console.error("There was an error creating the post!", error);
      }
    }
  };

  return (
    <Container>
      <Title>글쓰기</Title>
      <form onSubmit={handleSubmit}>
        <LabelContainer>
          <Label>메인 카테고리</Label>
          <RequiredText>필수</RequiredText>
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
          <RequiredText>필수</RequiredText>
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
          <RequiredText>필수</RequiredText>
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
          <RequiredText>필수</RequiredText>
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
          <Label htmlFor="limit">모집 인원</Label>
          <RequiredText>필수</RequiredText>
        </LabelContainer>
        <Input
          id="limit"
          name="limit"
          type="number"
          placeholder="모집 인원을 입력하세요"
          required
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />

        <LabelContainer>
          <Label htmlFor="deadline">마감일</Label>
          <RequiredText>필수</RequiredText>
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
