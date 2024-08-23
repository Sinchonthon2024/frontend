import { createBrowserRouter } from "react-router-dom";
import Main from "./routes/main/main";
import Layout from "./components/layout/layout";
import Post from "./routes/write/Post";
import MyPage from "./routes/profile/MyPage";
import MyPageEdit from "./routes/profile/MyPageEdit";
import Login from "./routes/login/login";
import PostDetail from "./routes/main/PostDetail";
import ProtectedRoute from "./components/common/protected-route";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Main />,
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
        path: "main/post/:id",
        element: <PostDetail />,
      },
      {
        path: "sharing",
        element: <Main />,
      },
      {
        path: "socialing",
        element: <Main />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default Router;
