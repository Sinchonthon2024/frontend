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
  const [inputEmail, setInputEmail] = useState();
  const [inputUniv, setInputUniv] = useState();
  const [univCheck, setUnivCheck] = useState(false);
  const [univDelayCheck, setUnivDelayCheck] = useState(false);
  const [codeCheck, setCodeCheck] = useState(false);
  const [inputName, setInputName] = useState();
  const navigate = useNavigate();
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    if (univCheck) {
      setTimeout(() => {
        setUnivDelayCheck(true);
        setUnivCheck(false);
      }, 2000);
    }
  }, [univCheck]);
  useEffect(() => {
    // console.log(location);
  }, [location]);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [inputCode, setInputCode] = useState();
  const [googleName, setGoogleName] = useState();
  const fetchLogin = async (name, email, uid) => {
    try {
      const res = await instance.post(`api/auth/login`, {
        name,
        email,
        uid,
      });
      localStorage.setItem("access_token", res.access_token);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };
  const onLogInClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    } finally {
      setLoginSuccess(true);
      setGoogleName(auth.currentUser.displayName);
      fetchLogin();
    }
  };
  const onSendCodeClick = () => {
    // UnivCert.certify 함수 정의
    function certify(key, email, univName, univCheck) {
      // API URL 설정
      const url = "https://univcert.com/api/v1/certify";

      // 요청에 포함할 데이터 구성
      const data = {
        key: key, // 부여받은 API KEY
        email: email, // 인증할 이메일
        univName: univName, // 대학 이름
        univ_check: univCheck, // 대학 재학 여부 확인
      };

      // fetch를 사용하여 POST 요청 보내기
      fetch(url, {
        method: "POST", // HTTP 메서드는 POST
        headers: {
          "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 설정
        },
        body: JSON.stringify(data), // 요청 본문에 JSON 데이터를 문자열로 변환하여 포함
      })
        .then((response) => response.json()) // 응답을 JSON 형태로 파싱
        .then((responseData) => {
          // 응답 결과 처리
          if (responseData.success) {
            console.log("인증번호 발송 성공");
          } else {
            console.log("인증번호 발송 실패");
            if (responseData.status) {
              console.log("오류 상태 코드:", responseData.status);
            }
            if (responseData.message) {
              console.log("오류 메시지:", responseData.message);
            }
          }
        })
        .catch((error) => {
          // 네트워크 오류 처리
          console.error("Error:", error);
        });
    }

    // 함수 호출 예시
    certify(
      "0eb8aef4-add3-4bec-affc-09023e7c8eff",
      inputEmail,
      inputUniv,
      true
    );
  };
  const onCodeClick = () => {
    // UnivCert.certify 함수 정의
    function certify(key, email, univName, code) {
      // API URL 설정
      const url = "https://univcert.com/api/v1/certifycode";

      // 요청에 포함할 데이터 구성
      const data = {
        key: key, // 부여받은 API KEY
        email: email, // 인증할 이메일
        univName: univName, // 대학 이름
        code: code, // 대학 재학 여부 확인
      };

      // fetch를 사용하여 POST 요청 보내기
      fetch(url, {
        method: "POST", // HTTP 메서드는 POST
        headers: {
          "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 설정
        },
        body: JSON.stringify(data), // 요청 본문에 JSON 데이터를 문자열로 변환하여 포함
      })
        .then((response) => response.json()) // 응답을 JSON 형태로 파싱
        .then((responseData) => {
          // 응답 결과 처리
          if (responseData.success) {
            console.log("인증코드가 맞습니다.");
            setCodeCheck(true);
          } else {
            console.log("인증코드가 아닙니다.");
            if (responseData.status) {
              console.log("오류 상태 코드:", responseData.status);
            }
            if (responseData.message) {
              console.log("오류 메시지:", responseData.message);
            }
          }
        })
        .catch((error) => {
          // 네트워크 오류 처리
          console.error("Error:", error);
        });
    }

    // 함수 호출 예시
    certify(
      "0eb8aef4-add3-4bec-affc-09023e7c8eff",
      inputEmail,
      inputUniv,
      inputCode
    );
  };
  const onCodeChange = (e) => {
    setInputCode(e.target.value);
  };
  const onUnivChange = (e) => {
    function certify(univName) {
      // API URL 설정
      const url = "https://univcert.com/api/v1/check";

      // 요청에 포함할 데이터 구성
      const data = {
        univName: univName, // 대학 이름
      };

      // fetch를 사용하여 POST 요청 보내기
      fetch(url, {
        method: "POST", // HTTP 메서드는 POST
        headers: {
          "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 설정
        },
        body: JSON.stringify(data), // 요청 본문에 JSON 데이터를 문자열로 변환하여 포함
      })
        .then((response) => response.json()) // 응답을 JSON 형태로 파싱
        .then((responseData) => {
          // 응답 결과 처리
          if (responseData.success) {
            console.log("대학 확인 성공");
            setInputUniv(e.target.value);
            setUnivCheck(true);
          } else {
            console.log("대학 확인 실패");
            if (responseData.status) {
              console.log("오류 상태 코드:", responseData.status);
            }
            if (responseData.message) {
              console.log("오류 메시지:", responseData.message);
            }
          }
        })
        .catch((error) => {
          // 네트워크 오류 처리
          console.error("Error:", error);
        });
    }

    if (e.target.value.length > 4) {
      // 함수 호출 예시
      certify(e.target.value);
    }
  };
  const onNameChange = (e) => {
    setInputName(e.target.value);
  };
  const onSignInClick = async () => {
    const token = localStorage.getItem("access_token");
    const body = {
      user_name: inputName,
      home: selectedOption,
      school: inputUniv,
      region_1depth_name: "서울",
      region_2depth_name: "서초구",
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await instance.post(`api/auth/signup`, body, { headers });
    } catch (e) {
      console.error(e);
    } finally {
      navigate("/socialing");
    }
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
      <FullWidthInput onChange={onNameChange} placeholder="닉네임" />

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
        <Input onChange={onUnivChange} placeholder="대학을 입력해주세요" />
        <SendButton onClick={onSendCodeClick}>대학교 확인</SendButton>
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
          placeholder="대학교 공식 이메일"
        />
        <SendButton onClick={onSendCodeClick}>인증번호 발송</SendButton>
      </InlineGroup>
      <InlineGroup>
        <Input onChange={onCodeChange} placeholder="인증번호 입력" />
        <VerifyButton onClick={onCodeClick}>인증</VerifyButton>
      </InlineGroup>
      {codeCheck && (
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
const LoadingGif = styled.img`
  width: 50px;
`;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 12px;
  margin-bottom: 20px;
  background-color: #f3f4f4;
  color: #030303;
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
