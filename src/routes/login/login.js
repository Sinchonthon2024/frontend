import React, { useState } from 'react';
import styled from 'styled-components';

const Login = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <LoginContainer>
            <Title>로그인</Title>
            <SocialButton>구글 소셜 로그인</SocialButton>
            <DividerContainer>
                <DividerLine />
                <DividerText>또는</DividerText>
                <DividerLine />
            </DividerContainer>
            <SignupLink>회원가입</SignupLink>

            <Label>닉네임</Label>
            <FullWidthInput placeholder="닉네임" />

            <Label>자취 여부</Label>
            <ButtonGroup>
                <OptionButton
                    selected={selectedOption === '자취'}
                    onClick={() => handleOptionClick('자취')}
                >
                    자취
                </OptionButton>
                <OptionButton
                    selected={selectedOption === '기숙사'}
                    onClick={() => handleOptionClick('기숙사')}
                >
                    기숙사
                </OptionButton>
                <OptionButton
                    selected={selectedOption === '본가'}
                    onClick={() => handleOptionClick('본가')}
                >
                    본가
                </OptionButton>
            </ButtonGroup>

            <Label>재학 중인 대학교</Label>
            <FullWidthSelect>
                <option value="">대학교 선택</option>
                <option value="서울대학교">서울대학교</option>
                <option value="연세대학교">연세대학교</option>
                <option value="고려대학교">고려대학교</option>
                <option value="한양대학교">한양대학교</option>
                <option value="성균관대학교">성균관대학교</option>
                <option value="중앙대학교">중앙대학교</option>
                <option value="이화여자대학교">이화여자대학교</option>
                <option value="경희대학교">경희대학교</option>
                <option value="한국외국어대학교">한국외국어대학교</option>
            </FullWidthSelect>

            <Label>대학교 인증</Label>
            <InlineGroup>
                <Input placeholder="대학교 공식 이메일" />
                <SendButton>인증번호 발송</SendButton>
            </InlineGroup>
            <InlineGroup>
                <Input placeholder="인증번호 입력" />
                <VerifyButton>인증</VerifyButton>
            </InlineGroup>

            <Label>거주 지역</Label>
            <FullWidthInput placeholder="거주 지역" />

            <SubmitButton>회원가입</SubmitButton>
        </LoginContainer>
    );
};

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
    background-color: ${({ selected }) => (selected ? '#007bff' : '#f0f0f0')};
    color: ${({ selected }) => (selected ? 'white' : '#333')};
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