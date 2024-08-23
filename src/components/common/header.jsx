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
    if (p === "socialing" || p === "main") setLocPos(0);
    else if (p === "sharing") setLocPos(50);
  }, [location]);

  const onNaviClick = (e) => {
    navigate(`/${e.target.id}`);
  };

  return (
    <Wrapper>
      <LeftSection>
        <Logo>로고</Logo>
        <SearchBox
          type="text"
          placeholder="검색어를 입력해 주세요."
        ></SearchBox>
      </LeftSection>
      <CenterSection>
        <NaviTab>
          <NaviBox>
            {path === "socialing" || path === "main" ? (
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
      </CenterSection>
      <RightSection>
        <MenuTab>
          <div>마이페이지</div>
          <div>문의</div>
        </MenuTab>
      </RightSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 64px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const SearchBox = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
`;

const NaviTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  bottom: -10px;
  height: 3px;
  background-color: black;
  width: 50px;
  left: ${(props) => props.locpos}px;
  transition: left 0.3s ease-in;
`;

const MenuTab = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
  div {
    cursor: pointer;
    font-weight: 500;
  }
`;

export default Header;
