import { Outlet } from "react-router-dom";
import Header from "../common/header";
import styled from "styled-components";

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
