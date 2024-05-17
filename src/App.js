import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx';
import EditData from './component/EditData.jsx';
import { Children } from 'react';

const PrivateRoute = ({children}) => {
  const isAuthenticated = localStorage.getItem("token") ?? ""
  return isAuthenticated ? children : <Navigate to={"/login"}/>
}

function App() {
  const token = localStorage.getItem("token")
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about-us' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        {/* <Route path='/user/dashboard' element={token ? <Dashboard /> : <Navigate to={"/"}/>} /> */}
        <Route 
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />
        {/* <Route path='/post/:postId' element={token ? <EditData /> : <Navigate to={"/"}/>} /> */}
        <Route 
          path="/post/:dataId?"
          element={
            <PrivateRoute>
              <EditData/>
            </PrivateRoute>
          }
        />


        <Route path='*' element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
