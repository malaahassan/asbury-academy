import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import FeedContent from '../components/FeedContent/FeedContent';
import { useParams, Link } from 'react-router-dom';
import React, { useEffect } from 'react';

function Posts() {
  // Access the post ID from the URL
  const { id } = useParams();

  // Logic to fetch and display the post based on the ID
  // This could be a fetch call to an API, or loading from a local data source
  
  return (
    <div className="inner-content">
        <Sidebar page='community'/>
        <div className="inner-content-with-header">
            <Header />
            <FeedContent page='posts' post={id} key={id}>
              <div className="page-go-back-container page-go-back-fixed-container">
                  <Link to="/community" className="page-go-back">
                              <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero"></path></svg>
                  </Link>
                  
              </div>
            
            </FeedContent>
        </div>
    </div>
 );

}
  
export default Posts;