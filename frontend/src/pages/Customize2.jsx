import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';

function Customize2() {
    const {userData} = useContext(userDataContext)
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "")
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] gap-[20px]'>
        <h1 className= 'text-white text-[30px] text-center'>Enter Your <span className = 'text-blue-200'>Assistant Name</span></h1>
    <input type = "text" placeholder = 'eg. Vihanga' className = 'w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'  required onChange={(e)=>setAssistantName(e.target.value)} value = {assistantName}/>
    {assistantName && <button className = 'min-w-[300px] h-[50px] mt-5 text-black font-semibold cursor-pointer bg-white rounded-full text-[19px]' onClick={()=> navigate("/customize2")}>Finally Create Your Assistant</button>}
    
    </div>
  )
}

export default Customize2