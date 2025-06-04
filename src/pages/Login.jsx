import React, { useContext, useEffect, useState, useRef } from 'react';
import { LoginContext } from '../components/Contexts/LoginContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useXHR } from "../components/Contexts/UseXHR";
import LoginWrapper from "../components/Login/LoginWrapper.jsx";
import LoginLogo from "../components/Login/LoginLogo.jsx";

const Login = () => {
  const { sendRequest } = useXHR();
  const navigate = useNavigate();
  const [loginErrors, setLoginErrors] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const { isLoggedIn, setIsLoggedIn, logData, setLogData } = useContext(LoginContext);
  const loginTimeout = useRef();
  const loginDetails = useRef({username: "", password: ""});
  const loginContainer = useRef();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);



function login() {
  sendRequest(
    ()=>{
      setLoginErrors([]);
      setLoadingState(true);
    },
    "/back/login.php",
    loginDetails.current,
    loginTimeout,
    (response) => {
        setLoginErrors([]);
        setIsLoggedIn(true);
        setLogData(response);
    },
    () => {
      setLoadingState(false);
    },
    (errors) => {
      loginContainer.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setLoginErrors(errors);
    } 
    
  );

  if (isLoggedIn) {
    return null;
  }
}

  return (
    <LoginWrapper>
      <div className='login-container' ref={loginContainer}>
      <LoginLogo/>
      {loginErrors.length > 0 && 
          <div className='login-errors'>
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                fillRule="nonzero"
              />
            </svg>
            <ul>
              {loginErrors.map((error, index) =>{return(<li key={index}> {error} </li>)} )}
            </ul>
            
          </div>
        }
        <div className='login-form' style={{pointerEvents: loadingState ? "none" : "auto", "opacity": loadingState ? "0.8" : "1"}}>
          <div className='input-field'>
            <label>Username <span> </span></label>
            <input type='text' name='username' onChange={(e)=>loginDetails.current.username = e.target.value} onKeyDown={(e)=> e.key === "Enter" && login()}/>
          </div>
          <div className='input-field'>
            <label>Password <span> </span></label>
            <input type='password' name='password' onChange={(e)=>loginDetails.current.password = e.target.value} onKeyDown={(e)=> e.key === "Enter" && login()}/>
          </div>
          <button className='submit-btn' onClick={login}>
            {loadingState ? 
            <div className="comment-send-loader login-btn-loading-bit"></div>
            :
            <span>Login</span>
            }
          </button>
        </div>
        <p style={{fontSize: 14}}>Don't have an account? <Link to="/register" className="load-more-comments" style={{margin: 0}}>Sign up</Link></p>
      </div>
    </LoginWrapper>
        
      
  );
};

export default Login;