import { createContext, useContext, useEffect, useState } from "react";

export const Authcontext = createContext();

export const AuthProvider = ({children})=>{
    const[token,setToken] = useState(localStorage.getItem("token"))
    const[user,setUser] = useState("")

   const  storeTokenInLs = (storetoken) =>{
    setToken(storetoken)
     return localStorage.setItem("token",storetoken)
   }

   let isloggin = !!token

   const Logoutuser = ()=>{
    setToken("")
    return localStorage.removeItem("token")

}


   const userAuthentication = async()=>{
    try {
        const response = await fetch("http://localhost:3004/api/auth/user",{
            method:"GET",
            headers:{
                Authorization:authoriztiontoken
            }
        })

        if(response.ok){
            const data = await response.json()
            console.log("userdata",data)
            setUser(data.userdata)
            
        }else{
            console.log("error fetching")
        }
        
    } catch (error) {
        console.log("error fetching user")
        
    }
   }

   useEffect(()=>{
    userAuthentication()

   },[])

    
    return <Authcontext.Provider value={{storeTokenInLs,user,Logoutuser,isloggin}}>{children}</Authcontext.Provider>
}

export const useAuth = ()=>{
    const authcontextvalue = useContext(Authcontext)
    if(!authcontextvalue){
        throw new Error("useAuth user outside")
    }
    return authcontextvalue;

}