import { createBrowserRouter } from "react-router-dom";
import Main from "./routes/main/main";
import Layout from "./components/layout/layout";
import Login from "./routes/login/login";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "sharing",
        element: <Main />,
      },
      {
        path: "socialing",
        element: <Main />,
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
