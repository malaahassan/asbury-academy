import React, { useState, useRef, useEffect, useContext } from 'react';
import Notification from './Notification';
import NotificationSkeleton from '../Skeletons/NotificationSkeleton';
import UseOutsideClick from '../Window/UseOutsideClick';
import Errors from '../Window/Errors';
import { LoginContext } from '../Contexts/LoginContext';


function Notifications() {
  const { logData, setLogData } = useContext(LoginContext);
  const [error, setError] = useState({error: null, message: null});
  const [notifications, setNotifications] = useState([]);
  const [notificationsNumber, setNotificationsNumber] = useState(logData.notifications);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedStatus, setLoadedStatus] = useState(false);
  const notificationsMenuRef = useRef();
  const notificationsButtonRef = useRef();
  const notificationsCountStart = useRef(0);
  const notificationsCountEnd = useRef(5);
  const notificationsLoadingRef = useRef(false);
  const notificationsTimeout = useRef();

  UseOutsideClick(notificationsMenuRef, notificationsButtonRef, () => isVisible && toggleVisibility());

  useEffect(() => {
    const notificationsMenu = notificationsMenuRef.current;
    notificationsMenu.addEventListener('scroll', function(){
      if ((notificationsMenu.scrollHeight - notificationsMenu.scrollTop - 70 <= notificationsMenu.clientHeight) && !notificationsLoadingRef.current) {
        getNotifications();        
      }
    });
    
    }, []);

  function toggleVisibility(){
    clearTimeout(notificationsTimeout.current);
    const notificationsMenu = notificationsMenuRef.current;
    const notificationsButton = notificationsButtonRef.current;
    let timer;
    if(isVisible){
      notificationsButton.style.pointerEvents = "none";
      timer = setTimeout(function(){
        clearTimeout(timer);
        notificationsMenu.style.display = "none";
        notificationsButton.style.pointerEvents = "auto";
      }, 300);
    } else {
      notificationsCountStart.current = 0;
      notificationsCountEnd.current = 5;
      notificationsLoadingRef.current = false;
      setLoadedStatus(false);
      setNotifications([]);
      getNotifications();
      clearTimeout(timer);
      notificationsMenu.style.display = "flex";
    }
    setIsVisible(!isVisible);
  }

  function getNotifications(){
    clearTimeout(notificationsTimeout.current);
    notificationsLoadingRef.current = true;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/back/notifications.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xhr.send(`offset=${encodeURIComponent(notificationsCountStart.current)}&limit=${encodeURIComponent(notificationsCountEnd.current)}`);
    xhr.onerror = () => notificationsTimeout.current = setTimeout( ()=>getNotifications(), 2000);
    xhr.onload = function(){
      if(xhr.status == 200){
        notificationsLoadingRef.current = false;
        try {
          let response = JSON.parse(xhr.responseText);
          if(response[2] != null){
            setNotifications(prevNotifications => [...prevNotifications, ...response[2]]);
            setNotificationsNumber(response[1]);
            setLogData((prevState) => ({
              ...prevState,
              notifications: response[1]
            }));

            if(notificationsCountEnd.current >= response[0]){
              notificationsLoadingRef.current = true;
              setLoadedStatus(true);
            }
            
            notificationsCountStart.current = response[2][response[2].length - 1]["id"];
            notificationsCountEnd.current += 5;
          } else {
            notificationsLoadingRef.current = true;
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
    <button ref={notificationsButtonRef} className={isVisible ?  "notifications-button-open notifications-button" : "notifications-button"} onClick={() => toggleVisibility()}>
      
      {isVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M15 21c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm.137-17.055c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.668 2.709-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.193-10.598-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm-6.451 16c1.189-1.667 1.605-3.891 1.964-5.815.447-2.39.869-4.648 2.354-5.509 1.38-.801 2.956-.76 4.267 0 1.485.861 1.907 3.119 2.354 5.509.359 1.924.775 4.148 1.964 5.815h-12.903z"/>
      </svg>}
      {notificationsNumber > 0 && <div className="notification-bubble"><span>{notificationsNumber <= 99 ? notificationsNumber : "99"}</span></div>}
      
    </button>
    <div ref={notificationsMenuRef} className={isVisible ? "notifications-menu fade-in" : "notifications-menu fade-out"} style={{display: "none"}}>
      {
        (notifications.length <= 0 && loadedStatus) && 
        <div style={{display: "flex", alignItems: "center", justifyContent:"center", width: "100%", height: "100%", minHeight: "150px"}}>
          <p>No Notifications</p>
        </div>
      }
      {
        notifications.map((notification, index) => <Notification key={index} poster={notification.poster} name={notification.target_user_first_name} read={notification.read == 1?true:false} time={notification.time} text={notification.text} post_id={notification.target_post_id}/>)
      }
        <div style={{display: loadedStatus? "none" : "flex", flexDirection: "column", pointerEvents: "none"}}>
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
        </div>
      
      </div>
    </>
    
    
  );
}

export default Notifications;
