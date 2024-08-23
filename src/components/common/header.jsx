import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [locPos, setLocPos] = useState(0);
  const [path, setPath] = useState("socialing");
  useEffect(() => {
    setPath(location.pathname.split("/")[1]);
    const p = location.pathname.split("/")[1];
    if (p === "socialing") setLocPos(0);
    else if (p === "sharing") setLocPos(50);
  }, [location]);
  const onNaviClick = (e) => {
    navigate(`/${e.target.id}`);
  };
  return (
    <Wrapper>
      <div className="right">
        <Logo>로고</Logo>
        <SearchBox
          type="text"
          placeholder="검색어를 입력해 주세요."
        ></SearchBox>
      </div>
      <NaviTab>
        <NaviBox>
          {path === "socialing" ? (
            <div
              id="socialing"
              style={{ color: "black", fontWeight: "800" }}
              onClick={onNaviClick}
            >
              소셜링
            </div>
          ) : (
            <div id="socialing" onClick={onNaviClick}>
              소셜링
            </div>
          )}
          {path === "sharing" ? (
            <div
              id="sharing"
              style={{ color: "black", fontWeight: "800" }}
              onClick={onNaviClick}
            >
              나눔
            </div>
          ) : (
            <div id="sharing" onClick={onNaviClick}>
              나눔
            </div>
          )}
          <Navigator locpos={locPos}></Navigator>
        </NaviBox>
      </NaviTab>
      <MenuTab>
        <div>마이페이지</div>
        <div>문의</div>
      </MenuTab>
    </Wrapper>
  );
};
const NaviBox = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  width: 100px;
  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text3);
  }
`;
const Navigator = styled.div`
  position: absolute;
  bottom: 0.5rem;
  height: 3px;
  background-color: black;
  width: 50px;
  left: ${(props) => props.locpos}px;
  transition: left 0.3s ease-in;
`;
const Logo = styled.div``;
const SearchBox = styled.input``;
const NaviTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const MenuTab = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 2rem;
  div {
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 64px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 12px 0;
  background-color: var(--text4);
  padding: 0 40px;
  .right {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 2rem;
  }
`;

export default Header;
