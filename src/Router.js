import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import Layout from "./components/layout/layout";
import Post from "./routes/write/Post";
import MyPage from "./routes/profile/MyPage";
import MyPageEdit from "./routes/profile/MyPageEdit";

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
        element: <Post />
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/profile/edit",
        element: <MyPageEdit />,
      },
    ],
  },
]);

export default Router;
