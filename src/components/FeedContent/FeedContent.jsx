import React, { useState, useEffect, useRef, useContext } from 'react';
import MyPost from './MyPost';
import PostSkeleton from '../Skeletons/PostSkeleton';
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../Contexts/LoginContext';
import { useXHR } from "../Contexts/UseXHR";



function FeedContent({page, children, post, user_username}) {
  const { logData, setLogData } = useContext(LoginContext);
  const { sendRequest } = useXHR();

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loadedStatus, setLoadedStatus] = useState(false);
  const postsCountRef = useRef(0);
  const postsLoadingRef = useRef(false);
  const containerRef = useRef();
  const sentinelRef = useRef();

  const feedTimeout = useRef();

  function getPosts(){
    

    let feedData = {};
    let feedURL = "";
    if(page == "profile"){
      if(post != null){
        feedData = {username: user_username,
                limit: postsCountRef.current + 5,
                post:post };
      } else {
        feedData = {username: user_username,
          limit: postsCountRef.current + 5};
      }
    } else {
      if(post != null){
        feedData = {
          limit: postsCountRef.current + 5,
          post:post };
      } else {
        feedData = {
          limit: postsCountRef.current + 5};
      }
    }

    if(page == "profile"){
      feedURL = "/back/feed_profile.php";
    } else if(page == "posts"){
      feedURL = "/back/feed_posts.php";
    } else if(page == "favourites"){
      feedURL = "/back/feed_favourites.php";
    }  else {
      feedURL = "/back/feed.php";
    } 

    sendRequest(
      ()=>{
        postsLoadingRef.current = true;
      },
      feedURL,
      feedData,
      feedTimeout,
      (response) => {
        setPosts(response[1]);
          
        postsCountRef.current = response[1].length;
        if(response[0] <= 0 && page == "posts"){
          navigate('/404');
        }
        if(response[1].length == response[0]){
          postsLoadingRef.current = true;
          setLoadedStatus(true);
        }
      },
      () => {
          postsLoadingRef.current = false;
      },
      undefined,
      () => {
          postsLoadingRef.current = true;
      }
      
    );
    
  }

  useEffect(() => {
      // This code runs after the component mounts
      const handleScroll = () => {
        if (!containerRef.current || !sentinelRef.current) return;

        const container = containerRef.current;
        const skeleton = sentinelRef.current;

        const containerBottom = container.scrollTop + container.clientHeight;
        const skeletonTop = skeleton.offsetTop;

        const offset = 50; // Adjust how early you want to trigger

        if (containerBottom >= skeletonTop - offset && !postsLoadingRef.current) {
          getPosts();
        }
      };
      getPosts();

        const container = containerRef.current;
        if (container) {
          container.addEventListener("scroll", handleScroll);
        }

        // Trigger initial check slightly after mount
        const initialTriggerTimeout = setTimeout(handleScroll, 500);

        // Cleanup on unmount
        return () => {
          if (container) {
            container.removeEventListener("scroll", handleScroll);
          }
          clearTimeout(initialTriggerTimeout);
        };
    
    }, []);

  return (
    <>

      <div ref={containerRef} className="feed-container" style={{ width: page=="posts" && "100%"}}>
        
        {children}
        {page == "community" && <MyPost getPosts={getPosts} />}
        {
        posts.map((post, index) => 
        <Post key={post["post_id"]} 
              {...post}
              pinned = {page == "community" ? post.pinned : false}
              allow_pin = {page == "community"}
              comments_open={page == "posts"}
              text_expanded={page == "posts"}
        />
        )
        }

        <div ref={sentinelRef} style={{display: loadedStatus?"none":"block"}}>
          <PostSkeleton />
          <PostSkeleton />
        </div>
        
        {(loadedStatus && page != "posts") && <p className="caughtMessage">You've reached the end of posts.</p>}
        
        <div className="space"></div>
      </div>
    </>
    
  );
}

export default FeedContent;