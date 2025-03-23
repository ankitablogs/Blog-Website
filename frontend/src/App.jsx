import AddBlog from "./components/AddBlog/AddBlog"
import BlogPage from "./components/BlogPage/BlogPage"
import Home from "./components/Home/Home"
import PrimarySearchAppBar from "./components/Navbar/Navbar"
import { BrowserRouter, Routes, Route } from "react-router"
import Admin from "./components/Admin/Admin"
import Login from "./components/Login/Login"
import ProtectedRoute from "./components/ProtectedPage"
import PublicRoute from "./components/PublicPage"
import axios from 'axios';
import { useEffect } from "react"
// axios.defaults.withCredentials = true;

function App() {

  useEffect(() => {
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    if (tokenTimestamp) {
      const currentTimestamp = new Date().getTime();
      const tokenExpiry = new Date(tokenTimestamp).getTime();
      if (currentTimestamp > tokenExpiry) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
      }
    }
  }, []);
  

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin/add" element={<ProtectedRoute><AddBlog/></ProtectedRoute>}/>
      <Route path="/blog/:id" element={<BlogPage/>}/>
      <Route path="/admin/home" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
      <Route path="/admin/add/:id" element={<ProtectedRoute><AddBlog/></ProtectedRoute>}/>
      <Route path="/admin/login" element={<PublicRoute><Login/></PublicRoute>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
