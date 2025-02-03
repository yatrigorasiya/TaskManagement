import { Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuth } from "../store/auth"

export const Logout = ()=>{

    
    const {Logoutuser} = useAuth()
    useEffect(()=>{
        Logoutuser()
    },[Logoutuser])
    return <Navigate to="/login"/>
}