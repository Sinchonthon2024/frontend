import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoginMap from "../../components/login/login-map";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { instance } from "../../api/instance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [location, setLocation] = useState("/");
  const [inputEmail, setInputEmail] = useState("");
  const [inputUniv, setInputUniv] = useState("");
  const [univCheck, setUnivCheck] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [univDelayCheck, setUnivDelayCheck] = useState(false);
  const [codeCheck, setCodeCheck] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    // Debug location
    console.log("Current location:", location);
  }, [location]);

  const fetchLogin = async (name, email, uid) => {
    try {
      const res = await instance.post(`api/auth/login`, {
        name,
        email,
        uid,
      });
      localStorage.setItem("access_token", res.access_token);
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const onLogInClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setGoogleName(auth.currentUser.displayName);
      setLoginSuccess(true);
      fetchLogin(
        auth.currentUser.displayName,
        auth.currentUser.email,
        auth.currentUser.uid
      );
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  const onSendCodeClick = () => {
    if (!inputEmail || !inputUniv) {
      alert("Please enter both your email and university.");
      return;
    }

    const key = "0eb8aef4-add3-4bec-affc-09023e7c8eff";
    certifyUniversity(key, inputEmail, inputUniv, true);
  };

  const onCodeClick = () => {
    const key = "0eb8aef4-add3-4bec-affc-09023e7c8eff";
    certifyCode(key, inputEmail, inputUniv, inputCode);
  };

  const onCodeChange = (e) => {
    setInputCode(e.target.value);
  };

  const onUnivChange = (e) => {
    setInputUniv(e.target.value);
    setUnivCheck(false);
    setEmailVerified(false);
    setCodeCheck(false);
    setSendButtonText("인증번호 발송"); // Reset button text when input changes
  };

  const onVerifyUnivClick = () => {
    if (inputUniv.length > 4) {
      verifyUniversity(inputUniv);
    }
  };

  const certifyUniversity = (key, email, univName, univCheck) => {
    const url = "https://univcert.com/api/v1/certify";
    const data = {
      key,
      email,
      univName,
      univ_check: univCheck,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        if (!response.ok) {
          console.error("Server responded with an error:", response.statusText);
        }

        return response.json();
      })
      .then((responseData) => {
        console.log("API Response Data:", responseData);

        if (responseData.success) {
          console.log("인증번호 발송 성공");
          setEmailVerified(true);
          setSendButtonText("발송완료"); // Update button text on success
        } else {
          console.log("인증번호 발송 실패:", responseData);
          setEmailVerified(false);
        }
      })
      .catch((error) => {
        console.error("Error sending verification code:", error);
        setEmailVerified(false);
      });
  };

  const certifyCode = (key, email, univName, code) => {
    const url = "https://univcert.com/api/v1/certifycode";
    const data = {
      key,
      email,
      univName,
      code,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          console.log("인증코드가 맞습니다.");
          setCodeCheck(true);
        } else {
          console.log("인증코드가 아닙니다:", responseData);
          setCodeCheck(false);
        }
      })
      .catch((error) => {
        console.error("Error verifying code:", error);
        setCodeCheck(false);
      });
  };

  const verifyUniversity = (univName) => {
    const url = "https://univcert.com/api/v1/check";
    const data = {
      univName,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          console.log("대학 확인 성공");
          setUnivCheck(true);
        } else {
          console.log("대학 확인 실패:", responseData);
          setUnivCheck(false);
        }
      })
      .catch((error) => {
        console.error("Error verifying university:", error);
        setUnivCheck(false);
      });
  };
  return (
    <LoginContainer>
      <Title>로그인</Title>
      <SocialButton onClick={onLogInClick}>
        <img
          style={{ width: "20px" }}
          src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
        />
        구글 소셜 로그인
      </SocialButton>
      <DividerContainer>
        <DividerLine />
        <DividerText>또는</DividerText>
        <DividerLine />
      </DividerContainer>
      <SignupLink>회원가입</SignupLink>

      <Label>닉네임</Label>
      <FullWidthInput defaultValue={googleName} placeholder="닉네임" />

      <Label>자취 여부</Label>
      <ButtonGroup>
        <OptionButton
          selected={selectedOption === "자취"}
          onClick={() => handleOptionClick("자취")}
        >
          자취
        </OptionButton>
        <OptionButton
          selected={selectedOption === "기숙사"}
          onClick={() => handleOptionClick("기숙사")}
        >
          기숙사
        </OptionButton>
        <OptionButton
          selected={selectedOption === "본가"}
          onClick={() => handleOptionClick("본가")}
        >
          본가
        </OptionButton>
      </ButtonGroup>

      <Label>재학 중인 대학교</Label>
      <InlineGroup>
        <Input onChange={onUnivChange} placeholder="" />
        <SendButton onClick={onVerifyUnivClick}>대학교 확인</SendButton>
      </InlineGroup>
      {univCheck && <LoadingGif src="https://i.gifer.com/ZC9Y.gif" alt="" />}
      {univDelayCheck && (
        <UnivCertify>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          인증 가능한 대학교입니다.
        </UnivCertify>
      )}

      <Label>대학교 인증</Label>
      <InlineGroup>
        <Input
          onChange={(e) => {
            setInputEmail(e.target.value);
          }}
          placeholder=""
        />
        <SendButton onClick={onSendCodeClick}>{sendButtonText}</SendButton>
      </InlineGroup>
      <InlineGroup>
        <Input onChange={onCodeChange} placeholder="" />
        <VerifyButton onClick={onCodeClick}>인증</VerifyButton>
      </InlineGroup>
      {univCheck && (
        <UnivCertify className="code">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          인증되었습니다.
        </UnivCertify>
      )}
      <Label>거주 지역</Label>
      <FullWidthInput disabled value={location} placeholder="거주 지역" />
      <LoginMap setLocation={setLocation} />
      <SubmitButton>회원가입</SubmitButton>
    </LoginContainer>
  );
};
const UnivCertify = styled.div`
  color: #4285f4;
  font-size: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  transition: display 0.3s ease-in;
  svg {
    width: 20px;
  }
  &.code {
    color: #28a745;
  }
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 360px;
  padding: 20px;
`;

const Title = styled.h1`
  align-self: flex-start;
  margin-bottom: 24px;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
`;

const DividerLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
`;

const DividerText = styled.span`
  margin: 0 10px;
  color: #666;
`;

const SignupLink = styled.a`
  align-self: flex-start;
  margin-bottom: 24px;
  color: #4285f4;
  cursor: pointer;
`;

const Label = styled.label`
  align-self: flex-start;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;

const FullWidthInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const FullWidthSelect = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: white;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
`;

const OptionButton = styled.button`
  flex: 1;
  padding: 12px;
  margin: 0 5px;
  background-color: ${({ selected }) => (selected ? "#007bff" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "white" : "#333")};
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const InlineGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 12px; /* 이메일과 인증번호 입력 줄 사이의 여백을 줄임 */
`;

const SendButton = styled.button`
  flex-basis: 40%;
  padding: 12px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const VerifyButton = styled.button`
  flex-basis: 40%;
  padding: 12px;
  margin-left: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default Login;
