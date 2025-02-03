import {BrowserRouter, Routes,Route} from "react-router-dom"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"

import { Error } from "./pages/Error"
import { Dashboard } from "./pages/Dashboard"
import { Logout } from "./pages/logout"


export const App = ()=>{
  return <>
  <BrowserRouter>
   <Navbar/>
  <Routes>
    
    <Route path="/" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/*" element={<Error/>}/>
    <Route path="/Dashboard" element={<Dashboard/>}/>
    <Route path="/logout" element={<Logout/>}/>

    
  </Routes>
  <Footer/>
  </BrowserRouter>
  </>

}