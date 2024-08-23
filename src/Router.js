import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import Main from "./routes/main/main";
import Layout from "./components/layout/layout";
import Login from "./routes/login/login";
import PostDetail from "./routes/main/PostDetail";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "main",
        element: <Main />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "main/post/:id",
        element: <PostDetail />,
      },
    ],
  },
]);

export default Router;
