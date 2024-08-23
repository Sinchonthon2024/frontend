import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import Main from "./routes/main/main";
import Layout from "./components/layout/layout";
import Post from "./routes/write/Post";
import MyPage from "./routes/profile/MyPage";
import MyPageEdit from "./routes/profile/MyPageEdit";
import Login from "./routes/login/login";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/profile/edit",
        element: <MyPageEdit />,
      },
      {
        path: "main",
        element: <Main />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default Router;
