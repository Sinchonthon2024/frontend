import styled from "styled-components";
import Router from "./Router";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
function App() {
  //로그인 처리 구현
  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={Router} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default App;
