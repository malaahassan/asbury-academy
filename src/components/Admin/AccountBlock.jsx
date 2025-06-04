
import React, { useState, useRef, useEffect } from 'react';
import AdditionalInfoBlock from './AdditionalInfoBlock';
import ExpandableInfoBlock from './ExpandableInfoBlock';
import EditAccountWindow from '../Window/EditAccountWindow';
import SureWindow from '../Window/SureWindow';
import TestHistoryContainer from '../Tests/TestHistoryContainer.jsx';
import AssignmentsHistoryTable from '../Assignments/AssignmentsHistoryTable.jsx';
import VideoHistoryContainer from '../Videos/VideoHistoryContainer.jsx';
import DropDown from '../Tools/DropDown';
import Sessions from '../Settings/Sessions';
import TestLineGraphContainer from '../Tests/TestLineGraphContainer.jsx';
import TestBarChartContainer from '../Tests/TestBarChartContainer.jsx';
import { useXHR } from "../Contexts/UseXHR";



const AccountBlock = ({ refetch, user_id, firstName, lastName, username, email, phoneNumber, birthday, gender, profile, cover, group, myaccount, dropdown_groups, test_submissions, watched_videos, sessions }) => {
  const { sendRequest } = useXHR();

  const [testFilter, setTestFilter] = useState("act");

  const [openTestsSuperExpander, setOpenTestsSuperExpander] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

  const deleteTimeout = useRef();
  const testsSuperExpanderTimeout = useRef();
  const [deleteAccountDisplayed, setDeleteAccountDisplayed] = useState(false);
  
  const [expanded, setExpanded] = useState(false);
  const [editAccountWindow, setEditAccountWindow] = useState(false);

  const [readyToRender, setReadyToRender] = useState(false);

  const expandTimeout = useRef();
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  useEffect(() => {
    clearTimeout(testsSuperExpanderTimeout.current);
  
    testsSuperExpanderTimeout.current = setTimeout(() => {
      setShowCharts(openTestsSuperExpander);
    }, 2000);
  
    return () => {
      clearTimeout(testsSuperExpanderTimeout.current);
    };
  }, [openTestsSuperExpander]);
  

  const renderSubjectsBlocks = (subjects, type) => {
    if(subjects.length > 0){
      return chunkArray(subjects, 2).map((chunk, index) => (
        <div key={index} className='subjects-block'>
          {chunk.map((subject, idx) => {
            if(type=== 'class'){
              return(<h2 key={idx}>{`Class ${subject}`}</h2>)
            }
            if(type=== 'subject'){
              return (<h2 key={idx}>{subject.subject}</h2>)
            }
            if(type=== 'grade'){
              return(<h2 key={idx}>{`Grade ${subject}`}</h2>)
            }
          }
            
          )}
        </div>
      ));
    } else {
      if(type=== 'class'){
        return(<h2>No classes.</h2>)
      }
      if(type=== 'subject'){
        return (<h2>No subjects.</h2>)
      }
    }
    
  };

  function handleDeleteClick(e){
    e.target.style.pointerEvents = "none";
    e.target.style.opacity = "0.5";

    sendRequest(
      ()=>{
        
      },
      "/back/delete_account.php",
      {
        user_id: user_id
      },
      deleteTimeout,
      () => {
        refetch();
        setDeleteAccountDisplayed(false);
      }
      
    );
}

function handleExpandClick(e){
  if(expanded){
    setOpenTestsSuperExpander(false);
    clearTimeout(expandTimeout.current);
    expandTimeout.current = setTimeout(function(){
      setReadyToRender(false);
      e.target.style.pointerEvents = "auto";
    }, 1000);
    setExpanded(false);
    e.target.style.pointerEvents = "none";
  } else {
    clearTimeout(expandTimeout.current);
    expandTimeout.current = setTimeout(function(){
      setExpanded(true);
      e.target.style.pointerEvents = "auto";
    }, 100);
    setReadyToRender(true);
    e.target.style.pointerEvents = "none";
  }
  
}
  
  return (
    <>
    <SureWindow display={deleteAccountDisplayed} message={`Are you sure you want to delete ${firstName}'s account?`} button="Delete" onYes={handleDeleteClick} onNo={()=>setDeleteAccountDisplayed(false)}/>
    {editAccountWindow &&
        <EditAccountWindow myaccount={myaccount} refetch={refetch} user_id={user_id} firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber} birthday={birthday} gender={gender} profile={profile} cover={cover} group={group} dropdown_groups={dropdown_groups} onClose={()=>{setEditAccountWindow(false)}} />
    }
      <div className='account-block'>
        <div className='account-header'>
          <div className='account-info'>
            <img src={profile} className='pfp' />
            <div className='account-name-container'>
              <div
                className='accounts-name-header'
                onClick={handleExpandClick}
              >
                <h1 style={{ fontSize: '17px' }}>{`${firstName} ${lastName}`}</h1>
                <svg className={expanded ? 'settings-arrow arrow-expanded' : 'settings-arrow'} fill='currentColor' height='20' width='20' xmlns='http://www.w3.org/2000/svg'>
                  <path d='m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z'></path>
                </svg>
              </div>
              <span style={{ fontSize: '14px', color: '#555555' }}>@{username}</span>
            </div>
          </div>
          <div className='accounts-btn-wrapper'>
            {!myaccount &&
              <button onClick={() => setDeleteAccountDisplayed(true)} className="account-edit-button">
                <svg className='edit-svg' clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                <span className="account-edit-text">Delete</span>
              </button>
            }
            
            <button onClick={() => setEditAccountWindow(true)} className="account-edit-button">
              <svg className='edit-svg' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z' fillRule='nonzero' />
              </svg>
              <span className="account-edit-text">Edit</span>
            </button>
          </div>
        </div>
            {
              readyToRender &&
              <ExpandableInfoBlock expanded={expanded}>
                <div className='hr' style={{ margin: '20px 0px', width: '100%' }}></div>
                <div className='account-full-info-container' style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 className="account-block-inside-header">Personal Info.</h3>
                  <div className='account-full-info'>
                    <div className='info-section'>
                      <div className='info-block'>
                        <h3>First name</h3>
                        <h2>{firstName}</h2>
                      </div>
                      <div className='info-block'>
                        <h3>Last name</h3>
                        <h2>{lastName}</h2>
                      </div>
                    </div>

                    <div className='info-section'>
                      <div className='info-block'>
                        <h3>Date of birth</h3>
                        <h2>{birthday}</h2>
                      </div>
                      <div className='info-block'>
                        <h3>Gender</h3>
                        <h2>{gender}</h2>
                      </div>
                    </div>

                    <div className='info-section'>
                      <div className='info-block'>
                        <h3>Email address</h3>
                        <h2>{email}</h2>
                      </div>
                      <div className='info-block'>
                        <h3>Phone number</h3>
                        <h2>{phoneNumber}</h2>
                      </div>
                    </div>
                    

                      <div className='info-section' style={{width: "100%"}}>
                        <div className='info-block'>
                          <h3>Group</h3>
                          <h2>{group ? group : "Unassigned"}</h2>
                        </div>
                      </div>

                  </div>
                  <h3 className="account-block-inside-header">Activity Info.</h3>
                  <div className="account-test-info-container">
                        <AdditionalInfoBlock title='Test History' subtitle={`${test_submissions} Submission${test_submissions != 1 ? "s" : ""}`} setOpen={setOpenTestsSuperExpander} >
                          <div className="super-expanded-container">
                            <div className="super-expanded-filters-container">
                            
                              <DropDown
                                    options={
                                        [
                                            {
                                              value: "act",
                                              displayName: "ACT Tests"
                                            },
                                            {
                                              value: "est",
                                              displayName: "EST Tests"
                                            },
                                            {
                                              value: "sat",
                                              displayName: "SAT Tests"
                                            },
                                            {
                                              value: "digitalsat",
                                              displayName: "Digital SAT Tests"
                                            },
                                            {
                                              value: "reading_workout",
                                              displayName: "Reading Workouts"
                                            },
                                            {
                                              value: "writing_workout",
                                              displayName: "Writing Workouts"
                                            }
                                        ]
                                    }
                                    value={testFilter} // Controlled value
                                    onChange={setTestFilter} // Handler to update the state
                                    sections={[]}
                                    menuId={`test-table-filter-${user_id}`}
                              />
                            </div>

                            <div className="account-graphs-container">
                              <TestLineGraphContainer ready={showCharts} user={user_id} type={testFilter} accounts={true}/>
                              <TestBarChartContainer ready={showCharts} user={user_id} type={testFilter} accounts={true}/> 
                              
                            </div>
                            
                            
                                  <div className="account-test-history-container">
                                    <TestHistoryContainer ready={showCharts} type={testFilter} user={user_id}/>
                                  </div>
                            


                            
                          </div>
                        </AdditionalInfoBlock>
                        {/* <AdditionalInfoBlock title='Assignment History'>
                          <div className="super-expanded-container">
                            <AssignmentsHistoryTable />
                          </div>
                        </AdditionalInfoBlock> */}
                        <AdditionalInfoBlock title='Watch History' subtitle={`${watched_videos} Video${watched_videos != 1 ? "s" : ""}`} setOpen={setOpenTestsSuperExpander}>
                          <div className="super-expanded-container">
                                  <div className="account-test-history-container">
                                    <VideoHistoryContainer ready={true} user={user_id}/>
                                  </div>
                          </div>
                        </AdditionalInfoBlock>
                        
                  </div>
                  
                  <h3 className="account-block-inside-header">Login Info.</h3>
                  <div className="account-test-info-container">
                    <AdditionalInfoBlock title='Devices'>
                      <div className="super-expanded-container">
                        <div className="accounts-sessions-container">
                          <Sessions sessions={sessions} is_profile={false}/>
                        </div>
                        
                      </div>
                              
                    </AdditionalInfoBlock>
                  </div>
                
                  
                </div>
              </ExpandableInfoBlock>
            }
        
      </div>
    </>
  );
};

export default AccountBlock;
