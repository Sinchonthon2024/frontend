import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./font.css";
import "./color.css";

export const GlobalStyles = createGlobalStyle`
${reset}
*{
    // 마진, 패딩, 박스-사이징
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    //폰트 등
    font-family: "Pretendard";
    letter-spacing: -1px;
    display: flex;
    justify-content: center;
    background-color: #fff;
}
//이제 태그에 따라서 자유롭게 글로벌 스타일을 적용할 수 있다. 
`;
