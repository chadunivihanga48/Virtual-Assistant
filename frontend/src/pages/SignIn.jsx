import React, {useState, useContext } from 'react'
import bg from '../assets/authBg.png'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/userContext.jsx';
import axios from "axios"

function SignIn() {
    const {serverUrl} = useContext(userDataContext)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")

    const handleSignIn=async (e)=>{
        e.preventDefault()
        setErr("")
        setLoading(true)
try{
    let result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email, password
    }, {withCredentials: true})
    console.log(result)
    setLoading(false)
}catch(error){
    console.log(error)
    setErr(error.response.data.message)
}
    }
  return (
    <div className = 'w-full h-screen bg-cover flex justify-center items-center' style={{backgroundImage: `url(${bg})`}}>
        <form className = 'w-[450px] h-[500px] max-w-[500px] bg-[#00000083] backdrop-blur-md shadow-lg shadow-back flex flex-col items-center justify-center gap-[20px] px-[20px] -mb-[20px]' onSubmit= {handleSignIn}>
            <h1 className = 'text-white text-[30px] font-semibold relative -top-1'>Sign in to <span className = 'text-blue-400'>Virtual Assistant</span></h1>
            
            <input type = "email" placeholder = 'Email' className = 'w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'  required onChange = {(e)=> setEmail(e.target.value)} value={email}/>
        <div className = 'w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px]'>
            <input type = "password" placeholder = 'password' className = 'w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]'  required onChange = {(e)=> setPassword(e.target.value)} value={password}/>
         </div>

            {err.length>0 && <p className= 'text-red-500 text-[17px]'>
                {err}
                </p>}
           <button className = 'min-w-[150px] h-[50px] bg-white rounded-full text-black text-[19px] mt-5' disabled= {loading}>{loading?"Loading...":"Sign In"}</button> 
            <p className = 'text-[white] text-[18px] cursor-pointer' onClick = {()=> navigate("/signup")}>Want to create a new account ? <span className = 'text-blue-400'>Sign Up</span></p>
       
        </form>
        </div>
  )
}

export default SignIn