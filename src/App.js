import "antd/dist/reset.css";
import "./App.scss";
import TopPage from "./components/top/TopPage";
import Homepage from "./components/home/Homepage";
import Login from "./components/login/Login";
import Signup from "./components/Signup";
import BookDetails from "./components/book/BookDetails";
import ComparingBooks from "./components/book/ComparingBooks";
import Compare from "./components/book/Compare";
import { PATHS } from "./config/paths";
import { Navigate, Route, Routes, BrowserRouter, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';

const PrivateRoute = () => {
  const [user,token,isAuth] = useAuth()
  const auth = isAuth; 
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

const CheckLoggedIn = () => {
  const [user,token,isAuth] = useAuth()
  const auth = isAuth; 
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Navigate to="/home" /> : <Outlet />;
}


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.topPage} element={<TopPage />} />
          <Route exact path='/' element={<CheckLoggedIn/>}>
            <Route path={PATHS.login} element={<Login />} />
          </Route>
          <Route path={PATHS.signup} element={<Signup />} />
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path={PATHS.home} element={<Homepage />} />
          </Route>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path={PATHS.bookDetails} element={<BookDetails/>} />
          </Route>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path={PATHS.comparingBooks} element={<ComparingBooks/>} />
          </Route>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path={PATHS.compare} element={<Compare/>} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
