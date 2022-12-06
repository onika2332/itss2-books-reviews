import "antd/dist/reset.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.scss";
import Homepage from "./components/home/Homepage";
import Login from "./components/login/Login";
import Signup from "./components/Signup";
import BookDetails from "./components/book/BookDetails";
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
    {
      path: PATHS.signup,
      element: <Signup />,
    },
    {
      path: PATHS.home,
      element: <Homepage />,
    },
    {
      path: PATHS.bookDetails,
      element: <BookDetails/>
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
