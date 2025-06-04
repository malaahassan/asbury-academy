import React, { useState, useRef, useEffect } from 'react';
import VideoTab from './VideoTabCard';
import VideoTabSkeleton from '../Skeletons/VideoTabSkeleton';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useXHR } from "../Contexts/UseXHR";

function VideosContinueWatchingContainer({breakpoints, videosContainerRef}) {
    const { sendRequest } = useXHR();

    const videosTimeout = useRef();
    const [videosLoading, setVideosLoading] = useState(false);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getVideos();
    }, [])
    
    
    function getVideos(){        

        sendRequest(
          ()=>{
            setVideosLoading(true);
          },
          "/back/get_my_video_history.php",
          {
            limit: 10,
            history: "distinct"
          },
          videosTimeout,
          (response) => {
              setVideos(response[1]);
              setVideosLoading(false);
          },
          () => {
              setVideosLoading(false);
          }
          
        );

      }
    
    return (
        <div className="videos-page-first-container" style={{pointerEvents: videosLoading ? "none" : "auto"}}>
                    <div className="see-more-container">
                        <h3 className="video-header">Continue Watching</h3>
                        <Link to="/videos/history" className="see-more-button">
                            View history
                            <svg
                            viewBox="0 0 24 24"
                            height={24}
                            width={24}
                            aria-hidden="true"
                            >
                                <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg">
                                    <path
                                    d="M7.758 3.054 C 7.416 3.147,7.160 3.395,7.061 3.729 C 6.985 3.987,6.985 4.053,7.063 4.323 C 7.125 4.534,7.225 4.638,10.853 8.270 L 14.579 12.000 10.871 15.710 C 7.994 18.589,7.145 19.460,7.083 19.600 C 6.984 19.819,6.975 20.182,7.062 20.391 C 7.144 20.587,7.381 20.831,7.580 20.924 C 7.818 21.034,8.175 21.025,8.422 20.901 C 8.576 20.824,9.545 19.876,12.745 16.671 C 16.526 12.885,16.876 12.524,16.935 12.343 C 17.017 12.094,17.017 11.906,16.935 11.657 C 16.876 11.476,16.528 11.117,12.768 7.353 C 9.951 4.532,8.609 3.214,8.483 3.147 C 8.252 3.024,7.992 2.990,7.758 3.054 "
                                    stroke="none"
                                    fillRule="evenodd"

                                    />
                                </svg>
                            </svg>
                        </Link>
                    </div>
                    
                    <div className="continue-watching-container">
                        
                        {
                            !videosLoading && videos.length <= 0 ?
                            <div className="videos-page-second-container" style={{marginTop: 0}}>
                                <div className="not-found-block" style={{marginTop: 0, gap: 25, border: "solid 1px transparent"}}>
                                    <img className="not-found-block-img" src="/images/start_watching.png" />
                                    {/* <h2 className="not-found-block-header">Start watching videos</h2> */}
                                    <button className="test-card-button white" style={{height: "auto"}} onClick={()=> videosContainerRef.current.scrollIntoView({ behavior: 'smooth' })}>Start Watching Videos</button>
                                </div>
                            </div>
                            :
                            <>
                                {/* Previous Button */}
                                <button className="swiper-button-prev swiper-button-prev-1">
                                <svg
                                    viewBox="0 0 24 24"
                                    height={24}
                                    width={24}
                                    aria-hidden="true"
                                    style={{transform: "rotate(180deg)"}}
                                    >
                                        <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg">
                                            <path
                                            d="M7.758 3.054 C 7.416 3.147,7.160 3.395,7.061 3.729 C 6.985 3.987,6.985 4.053,7.063 4.323 C 7.125 4.534,7.225 4.638,10.853 8.270 L 14.579 12.000 10.871 15.710 C 7.994 18.589,7.145 19.460,7.083 19.600 C 6.984 19.819,6.975 20.182,7.062 20.391 C 7.144 20.587,7.381 20.831,7.580 20.924 C 7.818 21.034,8.175 21.025,8.422 20.901 C 8.576 20.824,9.545 19.876,12.745 16.671 C 16.526 12.885,16.876 12.524,16.935 12.343 C 17.017 12.094,17.017 11.906,16.935 11.657 C 16.876 11.476,16.528 11.117,12.768 7.353 C 9.951 4.532,8.609 3.214,8.483 3.147 C 8.252 3.024,7.992 2.990,7.758 3.054 "
                                            stroke="none"
                                            fillRule="evenodd"

                                            />
                                        </svg>
                                    </svg>


                                </button>
                                <Swiper 
                                modules={[Navigation]} 
                                spaceBetween={20} 
                                
                                breakpoints={breakpoints}
                                grabCursor={true}
                                navigation={{
                                    nextEl: '.swiper-button-next-1',
                                    prevEl: '.swiper-button-prev-1',
                                }}
                                >
                                    {!videosLoading ? videos.map((video, index) => (
                                        <SwiperSlide key={video.id}>
                                            <VideoTab {...video} />
                                        </SwiperSlide>
                                    )) :
                                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                                            <SwiperSlide key={index}>
                                                <VideoTabSkeleton/>
                                            </SwiperSlide>
                                        ))
                                    }
                                    
                                </Swiper>
                                {/* Next Button */}
                                <button className="swiper-button-next swiper-button-next-1">
                                <svg
                                    viewBox="0 0 24 24"
                                    height={24}
                                    width={24}
                                    aria-hidden="true"
                                    >
                                    <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg">
                                        <path
                                        d="M7.758 3.054 C 7.416 3.147,7.160 3.395,7.061 3.729 C 6.985 3.987,6.985 4.053,7.063 4.323 C 7.125 4.534,7.225 4.638,10.853 8.270 L 14.579 12.000 10.871 15.710 C 7.994 18.589,7.145 19.460,7.083 19.600 C 6.984 19.819,6.975 20.182,7.062 20.391 C 7.144 20.587,7.381 20.831,7.580 20.924 C 7.818 21.034,8.175 21.025,8.422 20.901 C 8.576 20.824,9.545 19.876,12.745 16.671 C 16.526 12.885,16.876 12.524,16.935 12.343 C 17.017 12.094,17.017 11.906,16.935 11.657 C 16.876 11.476,16.528 11.117,12.768 7.353 C 9.951 4.532,8.609 3.214,8.483 3.147 C 8.252 3.024,7.992 2.990,7.758 3.054 "
                                        stroke="none"
                                        fillRule="evenodd"
                                        />
                                    </svg>
                                </svg>


                                </button>
                        </>
                        }
                        
                    </div>

                </div>
    );
  }
  
export default VideosContinueWatchingContainer;