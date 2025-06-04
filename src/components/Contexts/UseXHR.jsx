import { useState, useCallback, createContext, useContext } from "react";
import ErrorWindow from "../Window/Errors";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState({ error: null, message: null });

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      {error.error && <ErrorWindow error={error} close={()=> setError({error: null, message: null})}/>}
    </ErrorContext.Provider>
  );
};

export const useXHR = () => {
  const { setError } = useContext(ErrorContext);

  const sendRequest = useCallback((onStart, url, data, timeRef, onSuccess, onLoad, onNotSuccess, onError) => {
    function send(){
      if (onStart) onStart();
        clearTimeout(timeRef.current);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        const isFormData = data instanceof FormData;
        if (!isFormData) {
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        xhr.onerror = () => timeRef.current = setTimeout( ()=>send(), 2000);
        
        xhr.onload = function () {
        if (onLoad) onLoad();
        clearTimeout(timeRef.current);
        if (xhr.status === 200) {
            try {
              let response = JSON.parse(xhr.responseText);
              if (response.success) {
                  onSuccess(response.response);
              } else {
                  if (onNotSuccess) onNotSuccess(response.errors);
              }
            } catch (err) {
                console.log(err)
                setError({retry: send, error: "parse", message: `ON_CATCH ${xhr.status}`});
            }
        } else {
            setError({retry: send, error: "connection", message: `ON_NOT_200 ${xhr.status}`});
            if (onError) onError();
        }
        };
        
        xhr.send(isFormData ? data : new URLSearchParams(data).toString());
    }
    send();

  }, [setError]);

  return { sendRequest };
};
