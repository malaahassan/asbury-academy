import React, { useEffect, useState, useRef, useContext } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import InquiryBlock from '../components/Admin/InquiryBlock';
import NotFoundBlock from '../components/Admin/NotFoundBlock';
import Errors from '../components/Window/Errors';
import { LoginContext } from '../components/Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

function Inquiries() {
  const navigate = useNavigate();
  const { logData, setLogData } = useContext(LoginContext);
  
  useEffect(()=>{
    if(!logData.admin){
      navigate('/404');
    }
  },[]);

  const [error, setError] = useState({error: null, message: null});
  const [inquiries, setInquiries] = useState([]);
  const [loadedStatus, setLoadedStatus] = useState(false);
  const containerRef = useRef();
  const inquiriesLoadingRef = useRef(false);
  const inquiriesTimeout = useRef();
  const inquiriesCountRef = useRef(0);

  useEffect(() => {
    // This code runs after the component mounts
    const container = containerRef.current;
    container.addEventListener('scroll', function(){
      if ((container.scrollHeight - container.scrollTop - 250 <= container.clientHeight) && !inquiriesLoadingRef.current) {
        getInquiries();        
      }
    });
    getInquiries();
    }, []);

  function getInquiries(){
    clearTimeout(inquiriesTimeout.current);
    inquiriesLoadingRef.current = true;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/back/inquiries.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`limit=${encodeURIComponent(inquiriesCountRef.current + 5)}`);
    xhr.onerror = () => inquiriesTimeout.current = setTimeout( ()=>getInquiries(), 2000);
    xhr.onload = function(){
      if(xhr.status == 200){
        inquiriesLoadingRef.current = false;
        try {
          let response = JSON.parse(xhr.responseText);
          setInquiries(response[1]);
          
          inquiriesCountRef.current = response[1].length;
          /*if(response[0] <= 0){
            navigate('/404');
          }*/
          if(response[1].length == response[0]){
            inquiriesLoadingRef.current = true;
            setLoadedStatus(true);
          }
        } catch(err){
          setError({error: "parse", message: `ON_CATCH ${xhr.status}`});
        }
      } else {
        setError({error: "connection", message: `ON_NOT_200 ${xhr.status}`});
      }
    }
  }
  
    return (
      <>
      <Errors error={error} onClose={()=> setError({error: null, message: null})}/>
      <Header />
      <div className="inner-content">
        <Sidebar page={'inquiries'}/>
        <div className='accounts-wrapper' ref={containerRef}>
          <div className='accounts-container' >
            {inquiries.map((applicant, i)=>
              <InquiryBlock key={i} {...applicant}/>
            )}
            {
                (inquiries.length === 0 && loadedStatus) &&
                <NotFoundBlock />
            }
            <div className="account-block" style={{display: loadedStatus?"none":"block"}}>
                <div className="skeleton-admission" />
            </div>
            

          </div>
            
        </div>
      </div>
    </>
    );
  }
  
export default Inquiries;