import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import FeedContent from "../components/FeedContent/FeedContent";
import ProfileInfo from "../components/Profile/ProfileInfo";

import {useContext, useEffect, useState } from 'react';
import { LoginContext } from '../components/Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Profile() {
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();
    const { logData, setLogData } = useContext(LoginContext);

    useEffect(()=>{
      
      if(logData.role == "student" && !logData.admin){
        navigate('/404');
      }
    },[]);
    

    return (
        <div className="inner-content">
            <Sidebar page='community'/>
            <div className="inner-content-with-header">
                <Header />
                <FeedContent page='profile'>
                    <div className="page-go-back-container page-go-back-fixed-container">
                        <Link to="/community" className="page-go-back">
                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero"></path></svg>
                        </Link>
                    </div>
                  <ProfileInfo page='posts'/>
                </FeedContent >
            </div>
        </div>
    );
  }
export default Profile;