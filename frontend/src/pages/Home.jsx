import React, { useContext } from 'react';
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {
  const {userData, serverUrl, setUserData} = useContext(userDataContext)
  const navigate = useNavigate()
  const handleLogout = async ()=>{
    try{
        await axios.get(`${serverUrl}/api/auth/logout`,{ withCredentials: true})
          setUserData(null)
        navigate("/signup")
    }catch(error){
        setUserData(null)
        navigate("/signup")
        console.log(error)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col p-[20px] gap-[10px]'>
       <button className = 'min-w-[150px] h-[50px] bg-white absolute top-[40px] right-[70px] rounded-full text-black text-[19px] mt-5' onClick={handleLogout}>Log Out</button> 
        <button className = 'w-[230px] h-[50px] bg-white absolute top-[100px] right-[70px] rounded-full text-black text-[19px] mt-5' onClick={()=> navigate("/customize")} >Customize Your Assistant</button> 
      <div className = 'w-[500px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
        
        <img src = {userData?.assistantImage} alt = "" className = 'h-full object-cover'/> 
           
      </div>
      <h1 className = 'text-white text-[18px] font-semibold'>I'm {userData?.assistantName} </h1>
        
    </div>
  )
}

export default Home