import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.svg";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState("socialing");
  const [navigatorStyle, setNavigatorStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });
  const tabsRef = useRef([]);

  const updateNavigatorPosition = () => {
    const p = location.pathname.split("/")[1];
    setPath(p);

    const currentTab = tabsRef.current.find(
      (tab) =>
        tab.textContent ===
        (p === "socialing" || p === "main" ? "소셜링" : "나눔")
    );

    if (currentTab) {
      const navigatorWidth = currentTab.offsetWidth * 0.8; // Width 80% of the tab
      const navigatorLeft =
        currentTab.offsetLeft + (currentTab.offsetWidth - navigatorWidth) / 2; // Center align

      setNavigatorStyle({
        width: navigatorWidth,
        left: navigatorLeft,
        opacity: 1, // Ensure navigator is visible after calculation
      });
    }
  };

  useEffect(() => {
    updateNavigatorPosition();

    // Add resize event listener
    window.addEventListener("resize", updateNavigatorPosition);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateNavigatorPosition);
    };
  }, [location]);

  const onNaviClick = (e) => {
    navigate(`/${e.target.id}`);
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  return (
    <Wrapper>
      <LeftContainer>
        <Logo onClick={() => navigate("/")} />
        <SearchBox type="text" placeholder="검색어를 입력해 주세요." />
      </LeftContainer>
      <NaviTab>
        <NaviBox>
          <NaviItem
            id="socialing"
            active={path === "socialing" || path === "main"}
            onClick={onNaviClick}
            ref={(el) => (tabsRef.current[0] = el)}
          >
            소셜링
          </NaviItem>
          <NaviItem
            id="sharing"
            active={path === "sharing"}
            onClick={onNaviClick}
            ref={(el) => (tabsRef.current[1] = el)}
          >
            나눔
          </NaviItem>
          <Navigator
            style={{
              width: `${navigatorStyle.width}px`,
              left: `${navigatorStyle.left}px`,
              opacity: navigatorStyle.opacity, // Apply fade-in/out based on state
            }}
          />
        </NaviBox>
      </NaviTab>
      <MenuTab onClick={handleMyPageClick}>
        <div>마이페이지</div>
      </MenuTab>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  padding: 24px 100px; /* Padding: 24px vertical, 48px horizontal */
  background-color: #f5f5ff;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem; /* Increased gap between logo and search box */
`;

const NaviBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NaviItem = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  color: ${({ active }) => (active ? "#5856D6" : "#000")};
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  font-size: 18px;
  position: relative;
  margin: 0 5px;
  text-align: center;

  &:hover {
    color: #5856d6;
  }
`;

const Navigator = styled.div`
  position: absolute;
  bottom: 3px; /* Adjusted for text gap */
  height: 2.5px;
  background-color: #5856d6;
  border-radius: 2px;
  opacity: 0; /* Initial opacity */
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out,
    opacity 0.3s ease-in-out; /* Sliding and fade effects */
`;

const Logo = styled.div`
  background-image: url(${logo});
  width: 120px; /* 적절한 로고 크기 설정 */
  height: 40px; /* 적절한 로고 크기 설정 */
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const SearchBox = styled.input`
  flex: 1;
  max-width: 300px;
  border: none;
  outline: none;
  background-color: white;
  padding: 12px 16px;
  border-radius: 4px;
`;

const NaviTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
