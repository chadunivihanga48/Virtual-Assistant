import React, { createContext } from 'react'
export const userDataContext = createContext()

function UserContext({children}) {
    const serverUrl = "http://localhost:8000"
    const [userData, setuserData] = useState(null)
    const handleCurrentUser = async ()=> {
      try{
          const result = await axios.get(`${serverUrl}/api/user/current`, {withCredentials:true})
          setUserData(result.data) 
          console.log(result.data)
      }catch(error){
          console.log(error)
      }
    }

    useEffect(()=> {
      handleCurrentUser()
    })
  return (
    
        <userDataContext.Provider value={{serverUrl}}>
            {children} 
        </userDataContext.Provider>
        
    
  );
}

export default UserContext;