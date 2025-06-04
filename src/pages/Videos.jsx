import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import 'swiper/css';
import 'swiper/css/navigation';
import UserVideoCards from '../components/Videos/UserVideoCards';
import VideosContinueWatchingContainer from '../components/Videos/VideosContinueWatchingContainer';
function Videos() {
    const [availabilityFilter, setAvailabilityFilter] = useState("all");
    const [durationFilter, setDurationFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");

    const breakpoints = {
        0: { slidesPerView: 1 },
        700: { slidesPerView: 2 },
        1350: { slidesPerView: 3 },
        1920: { slidesPerView: 4 },
        2150: { slidesPerView: 5 },
        2500: { slidesPerView: 6 },
      };

      const getSlidesPerView = (width) => {
        const sortedKeys = Object.keys(breakpoints)
          .map(Number)
          .sort((a, b) => a - b);
      
        for (let i = 0; i < sortedKeys.length; i++) {
          const current = sortedKeys[i];
          const next = sortedKeys[i + 1];
      
          if (width >= current && (next === undefined || width < next)) {
            return breakpoints[current].slidesPerView;
          }
        }
      
        return 1; // fallback
      };

    const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
        setSlidesPerView(getSlidesPerView(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const containerRef = useRef();
    const videosContainerRef = useRef();

    return (
        <div className="inner-content">
          <Sidebar page='videos'/>
          <div className="inner-content-with-header">
            <Header />
            <div className="videos-page-full-container" ref={containerRef}>
                <VideosContinueWatchingContainer breakpoints={breakpoints} videosContainerRef={videosContainerRef}/>
                <div className="hr" style={{width: "100%", marginBottom: 50, marginTop: 40}}></div>
                <div ref={videosContainerRef}>
                  <UserVideoCards containerRef={containerRef} slidesPerView={slidesPerView}/>
                </div>
                

            </div>
            
            
          </div>
        </div>
    );
  }
  
export default Videos;