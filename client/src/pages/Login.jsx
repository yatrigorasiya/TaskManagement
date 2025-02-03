import React, { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Login = () => {
     const [formdata,setFormdata] = useState({
      username:"",
      password:""
     })
  
     const handleChange = (e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setFormdata({
          ...formdata,
          [name]:value
      })
  
     }

     const {storeTokenInLs} = useAuth()
  
  
  
  
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:3004/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formdata)
        })
        const res_data = await response.json()
        console.log("res from server",res_data)
        if(response.ok){
          
            storeTokenInLs(res_data.token)
            // localStorage.setItem("token",res_data.token)
            setFormdata({username:"", password:""})
            toast.success("login succesfully")
            // navigate("/login")
        }else{
          toast.error(res_data.extradetails ? res_data.extradetails : res_data.message,
            {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",}
        )
        }
      } catch (error) {
        console.log(error)
        
      }
     
   
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formdata.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

