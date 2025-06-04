import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header/Header';
import AlertWindow from '../components/Window/AlertWindow';
import Sidebar from '../components/Sidebar/Sidebar';
import VideoPlaybackSkeleton from '../components/Skeletons/VideoPlaybackSkeleton';
import Text from '../components/FeedContent/Text';
import { useParams, Link } from 'react-router-dom';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { useXHR } from "../components/Contexts/UseXHR";

function Watch() {
    const { id } = useParams();
    const { sendRequest } = useXHR();
    const videoRef = useRef(null);
    const plyrRef = useRef(null);
    const lastSentTimeRef = useRef(0);
    const [details, setDetails] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const durationUpdateloading = useRef(false);
    const [plyrLoaded, setPlyrLoaded] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [src, setSrc] = useState(null);

    

    const videoTimeout = useRef();
    const sendProgressTimeout = useRef();

    const sendProgress = (currentTime) => {
      if(!durationUpdateloading.current){
        sendRequest(
          ()=>{
            durationUpdateloading.current = true;
          },
          "/back/update_video_duration.php",
          {
              duration: currentTime,
              token: details.token
          },
          sendProgressTimeout, 
          ()=>{

          },
          ()=>{
            durationUpdateloading.current = false;
          }
          
        );
      }
        
        
      };

    function getVideo(){        

        sendRequest(
            ()=>{

            },
            "/back/get_video.php",
            {id: id},
            videoTimeout,
            (response) => {
                setDetails(response);
                setSrc(`/back/stream.php?token=${response.token}`);
                setLoaded(true);
            },
            () => {
                
            },
            (errors) => {
                setAlerts(errors);
            }
            
          );

      }

    useEffect(() => {
      getVideo();
    }, [])

    useEffect(() => {
        const onPause = () => {
            if(plyrRef.current){
              sendProgress(plyrRef.current.currentTime);
            }
        };
        
          const onTimeUpdate = () => {
            if(plyrRef.current){
              if (Math.abs(plyrRef.current.currentTime - lastSentTimeRef.current)  > 30) {
                lastSentTimeRef.current = plyrRef.current.currentTime;
                sendProgress(plyrRef.current.currentTime);
              }
            }
          };

          

          const onReady = () => {

            /*plyrRef.current.media.addEventListener('loadedmetadata', () => {
                console.log("test1")
                plyrRef.current.currentTime = details.duration; 
                plyrRef.current.play();
              }, { once: true });*/
              plyrRef.current.once('canplay', () => {
                if(plyrRef.current){
                  plyrRef.current.currentTime = details.duration; 
                  plyrRef.current.play().catch((error) => {
                    plyrRef.current.muted = true;
                    plyrRef.current.play();
                  });
                }
                
              });

            setPlyrLoaded(true);
          }

          
        if (!plyrRef.current && src) {
          console.log("here")
          plyrRef.current = new Plyr(videoRef.current, {
            controls: ['play-large', 'play', 'progress', 'current-time', 'volume', 'settings', 'fullscreen'],
            speed: {
              selected: 1,
              options: [0.5, 1, 2],
            },
            fullscreen: {
              enabled: true,        // Enable fullscreen
              fallback: true,       // Use fallback if Fullscreen API is not supported
              iosNative: true,      // ✅ Use iOS native fullscreen (webkitEnterFullscreen)
            },
          });
    
          plyrRef.current.on('ready', onReady);
          plyrRef.current.on('pause', onPause);
          plyrRef.current.on('timeupdate', onTimeUpdate);

          
        
          
    
          
        }
    
        return () => {
          if (plyrRef.current) {
            setPlyrLoaded(false);
            plyrRef.current.off('ready', onReady);
            plyrRef.current.off('pause', onPause);
            plyrRef.current.off('timeupdate', onTimeUpdate);
            plyrRef.current.destroy();
            plyrRef.current = null;
            console.log("here2")
          }
          
        };
      }, [src]);

    
    return (
        <div className="inner-content">
            {alerts.length > 0 &&
                <AlertWindow alert={alerts} onClose={() => setAlerts([])} />
            }
          <Sidebar page='videos'/>
          <div className="inner-content-with-header">
            <Header />
            <div className="video-playback-page-container">
                <div className="page-go-back-container page-go-back-fixed-container">
                    <Link to="/videos" className="page-go-back">
                            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero"></path></svg>
                    </Link>
                    
                </div>

                <div style={{display: loaded && plyrLoaded? "block":"none"}} className="plyr-container">
                    <video
                        playsInline={true}
                        x-webkit-playsinline="true"
                        
                        ref={videoRef}
                        >
                        <source src={src} />
                    </video>
                    
                </div>
                
                {details && loaded ?
                    <div className="video-playback-details-container">
                        <h2 className="video-playback-header">{details.title}</h2>
                        <Link to={`/community/profiles/${details.user_username}`} className="post-header-profile-block">
                            <img className="post-header-poster" src={details.user_poster} alt="User Profile Picture"/>
                            <div className="post-user-header">
                                <div className="post-user-header-name">
                                <span>{details.user_name}</span>
                                
                                { details.user_admin && 
                                    <span className="user-header-tag admin-tag" title="Administrator">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 19v3h-20v-3h20zm0-15c-1.5 0-2.662 1.685-1.598 3.194.535.759.406 1.216.045 1.749-.765 1.127-1.872 2.057-3.447 2.057-2.521 0-3.854-2.083-4.131-3.848-.096-.614-.15-1.074.436-1.644.402-.39.695-.904.695-1.508 0-1.104-.896-2-2-2s-2 .896-2 2c0 .604.293 1.118.695 1.508.586.57.531 1.03.436 1.644-.277 1.765-1.61 3.848-4.131 3.848-1.575 0-2.682-.93-3.447-2.058-.362-.532-.491-.989.045-1.748 1.064-1.509-.098-3.194-1.598-3.194-1.104 0-2 .896-2 2 0 .797.464 1.495 1.144 1.808.825.38.856 1.317.856 2.171v7.021h20v-7.021c0-.854.031-1.792.856-2.171.68-.313 1.144-1.011 1.144-1.808 0-1.104-.896-2-2-2z"></path></svg>
                                    </span>
                                }
                                { details.user_developer && 
                                    <span className="user-header-tag developer-tag" title="Developer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10.935v2.131l-10 4.934v-2.23l7.64-3.77-7.64-3.779v-2.221l10 4.935zm-24 0v2.131l10 4.934v-2.23l-7.64-3.77 7.64-3.779v-2.221l-10 4.935z"/></svg>
                                    </span>
                                }
                                
                                
                                </div>
                                <div className="post-header-tiny-info">
                                    <span>@{details.user_username}</span>

                                </div>
                            </div>
                        </Link>
                        <div className="video-playback-details-box">
                            <div className="video-tab-user-credit video-playback-info-text" >
                                <span>{details.views.text} view{details.views.number != 1 && "s"}</span>
                                <span className="video-tab-user-credit-bullet"></span>
                                <span>{details.time}</span>
                            </div>
                            <Text text={details.description} expanded={false}/>
                        </div>

                    </div>
                
                :
                <VideoPlaybackSkeleton />
                }
                

            </div>
            
            
          </div>
        </div>
    );
  }
  
export default Watch;