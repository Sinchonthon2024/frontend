import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import Layout from "./components/layout/layout";

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
        path: "sharing",
        element: <Home />,
      },
      {
        path: "socialing",
        element: <Home />,
      },
    ],
  },
]);

export default Router;
