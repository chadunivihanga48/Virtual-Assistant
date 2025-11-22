import React, { createContext } from 'react'
export const userDataContext = createContext()

function UserContext({children}) {
    const serverUrl = "http://localhost:8000"
   
  return (
    
        <userDataContext.Provider value={{serverUrl}}>
            {children} 
        </userDataContext.Provider>
        
    
  );
}

export default UserContext;