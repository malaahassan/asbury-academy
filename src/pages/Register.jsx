import React, { useContext, useEffect, useState, useRef } from 'react';
import { LoginContext } from '../components/Contexts/LoginContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useXHR } from "../components/Contexts/UseXHR";
import LoginWrapper from "../components/Login/LoginWrapper.jsx";
import LoginLogo from "../components/Login/LoginLogo.jsx";

const Register = () => {
  const { sendRequest } = useXHR();
  const navigate = useNavigate();
  const [loginErrors, setLoginErrors] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const { isLoggedIn, setIsLoggedIn, logData, setLogData } = useContext(LoginContext);  
  const loginTimeout = useRef();
  const loginContainer = useRef();
  

  const [step, setStep] = useState(1);
  const loginDetails = useRef({
    username: "",
    password: "", 
    firstname: "", 
    lastname: "", 
    gender: "male", 
    birthdate: "", 
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);



function register(success) {
  sendRequest(
    ()=>{
      setLoginErrors([]);
      setLoadingState(true);
    },
    "/back/register.php",
    {...loginDetails.current, step: step},
    loginTimeout,
    (response) => {
        success(response);
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

function nextStep(){
    if(step != 3){
        register(() => setStep((s)=>s+1) );
    } else {
      register(function (response){
        setLoginErrors([]);
        setIsLoggedIn(true);
        setLogData(response);
      });
    } 

    
}

function prevStep(){
    if(step != 1){
        setStep((s)=>s-1);
        setLoginErrors([]);
    } 
    
}


  return (
    <LoginWrapper>
      <div className='login-container' ref={loginContainer}>
      <LoginLogo/>
        <div className="steps-container">
        <ul className="progressbar">

          <li onClick={()=>setStep(1)} className={`progress-dot${step == 1 ? " progress-active" : ""}${step > 1 ? " progress-previous" : ""}`}>
            <span className="progress-logo"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg></span>
            <span className="progress-text">Personal Info.</span>
          </li>
          <span className="progress-line"></span>
          <li onClick={()=>setStep(2)} className={`progress-dot${step == 2 ? " progress-active" : ""}${step > 2 ? " progress-previous" : ""}`}>
            <span className="progress-logo"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.942c1.827 1.105 3.474 1.6 5 1.833v7.76c0 1.606-.415 1.935-5 4.76-4.592-2.826-5-3.158-5-4.76v-7.76c1.526-.233 3.173-.728 5-1.833zm9-1.942v11.535c0 4.603-3.203 5.804-9 9.465-5.797-3.661-9-4.862-9-9.465v-11.535c3.516 0 5.629-.134 9-3 3.371 2.866 5.484 3 9 3zm-2 1.96c-2.446-.124-4.5-.611-7-2.416-2.5 1.805-4.554 2.292-7 2.416v9.575c0 3.042 1.69 3.83 7 7.107 5.313-3.281 7-4.065 7-7.107v-9.575z"/></svg></span>
            <span className="progress-text">Login Info.</span>
          </li>
          <span className="progress-line"></span>
          <li onClick={()=>setStep(3)} className={`progress-dot${step == 3 ? " progress-active" : ""}`}>
            <span className="progress-logo"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/></svg></span>
            <span className="progress-text">Contact Info.</span>
          </li>
          
          <span className="progress-line"></span>
          <li className={`progress-dot`}>
            <span className="progress-logo"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"></path></svg></span>
            <span className="progress-text">Done</span>
          </li>

        </ul>
      </div>
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
          
          <div className='input-field' style={{display: step == 1 ? "flex" : "none"}}>
            <label>First name <span> </span></label>
            <input maxLength="20" type='text' name='firstname' onChange={(e)=>loginDetails.current.firstname = e.target.value} onKeyDown={(e)=> e.key === "Enter" && nextStep()}/>
          </div>
          <div className='input-field' style={{display: step == 1 ? "flex" : "none"}}>
            <label>Last name <span> </span></label>
            <input maxLength="20" type='text' name='lastname' onChange={(e)=>loginDetails.current.lastname = e.target.value} onKeyDown={(e)=> e.key === "Enter" && nextStep()}/>
          </div>
          <div className='input-field' style={{display: step == 1 ? "flex" : "none"}}>
            <label>Gender<span> </span></label>
            <select name="gender" onChange={(e)=>loginDetails.current.gender = e.target.value}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
          </div>
          <div className='input-field' style={{display: step == 1 ? "flex" : "none"}}>
            <label>Date of birth<span> </span></label>
            <input type='date' name='birthdate' onClick={(e)=>e.target.showPicker?.()} onChange={(e)=>loginDetails.current.birthdate = e.target.value}/>
          </div>
          

          <div className='input-field' style={{display: step == 2 ? "flex" : "none"}}>
            <label>Username <span> </span></label>
            <input type='text' name='username' onChange={(e)=>loginDetails.current.username = e.target.value} onKeyDown={(e)=> e.key === "Enter" && nextStep()}/>
          </div>
          
          
          <div className='input-field' style={{display: step == 2 ? "flex" : "none"}}>
            <label>Password <span> </span></label>
            <input type='password' name='password' onChange={(e)=>loginDetails.current.password = e.target.value} onKeyDown={(e)=> e.key === "Enter" && nextStep()}/>
          </div>

          <div className='input-field' style={{display: step == 3 ? "flex" : "none"}}>
            <label>Email address <span> </span></label>
            <input type='email' name='email' onChange={(e)=>loginDetails.current.email = e.target.value} onKeyDown={(e)=> e.key === "Enter" && nextStep()}/>
          </div>

          <div className='input-field' style={{display: step == 3 ? "flex" : "none"}}>
            <label>Phone number <span> </span></label>
            <input type='text' name='phone' onChange={(e)=>loginDetails.current.phone = e.target.value} onKeyDown={(e)=> e.key === "Enter" && nextStep()}/>
          </div>



          {step > 1 ?
            <div className="login-buttons-container">
                <button className='submit-btn' onClick={prevStep}>
                    <span>Back</span>
                </button>
                <button className='submit-btn' onClick={nextStep}>
                    {loadingState ? 
                    <div className="comment-send-loader login-btn-loading-bit"></div>
                    :
                    <span>{step == 3 ? "Sign up" : "Next"}</span>
                    }
                </button>
            </div>
            :
            <button className='submit-btn' onClick={nextStep}>
                    {loadingState ? 
                    <div className="comment-send-loader login-btn-loading-bit"></div>
                    :
                    <span>Next</span>
                    }
            </button>
          }
            
          
        </div>
        <p style={{fontSize: 14}}>Already have an account? <Link to="/login" className="load-more-comments" style={{margin: 0}}>Login</Link></p>
      </div>
    </LoginWrapper>
        
      
  );
};

export default Register;