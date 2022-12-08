import "antd/dist/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import TopPage from "./components/top/TopPage";
import Homepage from "./components/home/Homepage";
import Login from "./components/login/Login";
import Signup from "./components/Signup";
import { PATHS } from "./config/paths";

function App() {
  const router = createBrowserRouter([
    {
      path: PATHS.topPage,
      element: <TopPage />,
    },
    {
      path: PATHS.login,
      element: <Login />,
    },
    {
      path: PATHS.signup,
      element: <Signup />,
    },
    {
      path: PATHS.home,
      element: <Homepage />,
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
