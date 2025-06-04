import React, { useEffect, useState, createContext } from 'react';

const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logData, setLogData] = useState({});
  const [isChecking, setIsChecking] = useState(true);

  const checkLoginStatus = async () => {
    try {
      const request = new Request('/back/checkLogin.php', {
        method: "POST",
        credentials: 'same-origin',
      });

      const response = await fetch(request);

      if (!response.ok) {
        throw new Error('Failed to check login status');
      }

      const data = await response.json();
      setIsLoggedIn(data.success);
      setLogData(data.response);
    } catch (error) {
      console.log('Error:', error.message);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (isChecking) {
    return <div></div>;
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, logData, setLogData }}>
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginContextProvider };