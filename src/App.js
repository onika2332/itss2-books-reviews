import "antd/dist/reset.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.scss";
import Login from "./components/login/Login";
import { PATHS } from "./config/paths";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          Hello world!
          <Link to="/login">login</Link>
        </div>
      ),
    },
    {
      path: PATHS.login,
      element: <Login />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
