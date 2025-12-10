
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [frontendImage, setFrontendImage] =useState(null)
  const [backendImage, setBackendImage] =useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCurrentUser();
    // eslint-disable-next-line
  }, []);
const value ={
  serverUrl, userData, setUserData, loading, backendImage, setBackendImage, frontendImage, setFrontendImage, selectedImage, setSelectedImage
}


  return (
    
    <userDataContext.Provider value={{ serverUrl, userData, setUserData, loading, backendImage, setBackendImage, frontendImage, setFrontendImage, selectedImage, setSelectedImage }}>
      {children}
    </userDataContext.Provider>
    
  );
}

export default UserContext;