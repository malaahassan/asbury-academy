import React, { useEffect, useState, useRef, useContext } from 'react';
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import LogBlock from "../components/Admin/LogBlock";
import Errors from '../components/Window/Errors';
import NotFoundBlock from '../components/Admin/NotFoundBlock';
import { LoginContext } from '../components/Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';


function AuditLog() {
  const navigate = useNavigate();
  const { logData, setLogData } = useContext(LoginContext);
  
  useEffect(()=>{
    if(!logData.admin){
      navigate('/404');
    }
  },[]);

  const [error, setError] = useState({error: null, message: null});
  const [logs, setLogs] = useState([]);
  const [loadedStatus, setLoadedStatus] = useState(false);
  const containerRef = useRef();
  const logsLoadingRef = useRef(false);
  const logsTimeout = useRef();
  const logsCountRef = useRef(0);

  useEffect(() => {
    // This code runs after the component mounts
    const container = containerRef.current;
    container.addEventListener('scroll', function(){
      if ((container.scrollHeight - container.scrollTop - 250 <= container.clientHeight) && !logsLoadingRef.current) {
        getLogs();        
      }
    });
    getLogs();
    }, []);

    function getLogs(){
      clearTimeout(logsTimeout.current);
      logsLoadingRef.current = true;
      const xhr = new XMLHttpRequest();
  
      xhr.open("POST", "/back/audit_log.php");
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(`limit=${encodeURIComponent(logsCountRef.current + 10)}`);
      xhr.onerror = () => logsTimeout.current = setTimeout( ()=>getLogs(), 2000);
      xhr.onload = function(){
        if(xhr.status == 200){
          logsLoadingRef.current = false;
          try {
            let response = JSON.parse(xhr.responseText);
            setLogs(response[1]);
            
            logsCountRef.current = response[1].length;
            /*if(response[0] <= 0){
              navigate('/404');
            }*/
            if(response[1].length == response[0]){
              logsLoadingRef.current = true;
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
          <Sidebar page={'audit-log'}/>
          <div className='accounts-wrapper' ref={containerRef}>
            <div className='accounts-container'>
              {logs.map((interaction, index)=><LogBlock key={index} log={interaction} />)}
              {
                  (logs.length === 0 && loadedStatus) &&
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
export default AuditLog;