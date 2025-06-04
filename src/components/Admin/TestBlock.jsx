import React, { useState, useEffect, useRef } from 'react'
import AdditionalInfoBlock from './AdditionalInfoBlock';
import ExpandableInfoBlock from './ExpandableInfoBlock';
import TestHistoryContainer from '../Tests/TestHistoryContainer.jsx';
import TestBarChartContainer from '../Tests/TestBarChartContainer.jsx';
import TestDonutChartContainer from '../Tests/TestDonutChartContainer.jsx';
import UseOutsideClick from '../Window/UseOutsideClick';
import SureWindow from '../Window/SureWindow';
import EditTestInfoWindow from '../Window/EditTestInfoWindow';
import AddTestSectionWindow from '../Window/AddTestSectionWindow';

import { useXHR } from "../Contexts/UseXHR";



const TestBlock = ({
  id,
  name,
  submissions,
  type,
  test_interface,
  timer,
  release_date,
  full_date,
  code,
  sections,
  refetch
}) => {
  const { sendRequest } = useXHR();
  const [expanded, setExpanded] = useState(false);
  const [deleteTestDisplayed, setDeleteTestDisplayed] = useState(false);
  const [openTestsSuperExpander, setOpenTestsSuperExpander] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [editTestWindow, setEditTestWindow] = useState(false);
  const [addTestSectionWindow, setAddTestSectionWindow] = useState(false);
  const testsSuperExpanderTimeout = useRef();
  const editOptionsMenuRef = useRef();
  const editOptionsButtonRef = useRef();

  const deleteTimeout = useRef();
  const expandTimeout = useRef();

  const [readyToRender, setReadyToRender] = useState(false);

  const sectionsArray = sections.map((section) => section.displayName);

  UseOutsideClick(editOptionsMenuRef, editOptionsButtonRef, ()=>setIsOptionsOpen(false));

    useEffect(() => {
      clearTimeout(testsSuperExpanderTimeout.current);
    
      testsSuperExpanderTimeout.current = setTimeout(() => {
        setShowCharts(openTestsSuperExpander);
      }, 2000);

    
      return () => {
        clearTimeout(testsSuperExpanderTimeout.current);
      };

      

    }, [openTestsSuperExpander]);

    function handleDeleteClick(e){
      e.target.style.pointerEvents = "none";
      e.target.style.opacity = "0.5";
      sendRequest(
        ()=>{
          
        },
        "/back/delete_test.php",
        {
          id: id
        },
        deleteTimeout,
        () => {
          refetch();
          setDeleteTestDisplayed(false);
        }
        
      );
    }

    function openEditTestWindow(){
      setIsOptionsOpen(false);
      setEditTestWindow(true);
    }

    function openAddSectionWindow(){
      setIsOptionsOpen(false);
      setAddTestSectionWindow(true);
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
    <div className={expanded ? "account-block applicant-block applicant-block-expanded" : "account-block applicant-block"}>
      <SureWindow display={deleteTestDisplayed} message={`Are you sure you want to delete ${name} with all of its sections and submissions?`} button="Delete" onYes={handleDeleteClick} onNo={()=>setDeleteTestDisplayed(false)}/>
      { editTestWindow &&
            <EditTestInfoWindow refetch={refetch} id={id} name={name} code={code} date={full_date} test_interface={test_interface} type={type} onClose={()=>{setEditTestWindow(false)} } />
      }
      { addTestSectionWindow &&
            <AddTestSectionWindow refetch={refetch} id={id} name={name} code={code} date={full_date} test_interface={test_interface} type={type} onClose={()=>{setAddTestSectionWindow(false)} } />
      }
      <div ref={editOptionsMenuRef} className="post-options-menu test-edit-menu" style={{display: isOptionsOpen ? "block": "none", top: 75, right: 5, minWidth: 145}}>
          <button className="post-options-menu-button test-edit-menu-button" onClick={openEditTestWindow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 22v-2h6v2h-6zm7.311-7.662l9.689-9.804-4.536-4.534-9.69 9.802 4.537 4.536zm-7.311-6.338h1.743l1.978-2h-3.721v2zm11 8h2v-4.573l-2 2.023v2.55zm-9.576-4.718l-1.424 5.718 5.826-1.318-4.402-4.4zm-6.424-1.282v-2h3v-2h-5v4h2zm16 8v2h-3v2h5v-4h-2zm-13 2h-3v-2h-2v4h5v-2zm-5-4h2v-4h-2v4z"/></svg>
            <span>Edit test info.</span>
          </button>
          
          <button className="post-options-menu-button test-edit-menu-button" onClick={openAddSectionWindow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"></path></svg>
            <span>Add new section</span>
          </button>

          {sections.map((section, i) =>
            <a key={i} className="post-options-menu-button test-edit-menu-button" href={`/edit/index.html?id=${section.value}&interface=${test_interface}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.104 0l-4.104 4.152 18.888 18.799 5.112 1.049-.961-5.203-18.935-18.797zm15.946 21.502c-.167.166-.436.166-.602 0l-17.262-17.124c-.167-.167-.167-.435-.001-.603.166-.166.437-.166.603 0l17.262 17.126c.167.165.166.435 0 .601zm1.544-2.132c.166.166.166.437 0 .603-.166.165-.436.166-.602 0l-17.263-17.126c-.165-.165-.165-.435 0-.601.167-.166.436-.166.601-.001l17.264 17.125zm-2.855-14.067c-.195-.195-.195-.512 0-.707s.512-.195.707 0 .195.512 0 .707-.511.196-.707 0zm-7.734 12.641l-6.055 6.056-4.95-4.908 6.059-6.059 1.419 1.41-.407.407.707.707-.707.707-.707-.707-.707.707.707.707-.707.707-.707-.707-.707.707.707.707-.707.707-.707-.707-.707.708 2.121 2.121 4.657-4.657 1.398 1.387zm2.035-11.892l6.052-6.052 4.908 4.95-6.013 6.014-1.398-1.388 4.625-4.625-2.121-2.121-2.121 2.12.707.707-.708.708-.707-.707-.707.707.707.707-.707.707-.707-.708-.39.39-1.42-1.409z"/></svg>
              <span>Edit {section.displayName}</span>
            </a>
          
          )}


          
          
      </div>
      
      
      <div className="account-header">
        <div className="account-info">
          <div className="admission-headers-container">
          <svg className="admission-header-icon"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            style={{ minWidth: 24, width: 24, height: 24 }}
            >
            <path d="M2 0c-1.104 0-2 .896-2 2v15c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-15c0-1.104-.896-2-2-2h-20zm20 14h-20v-12h20v12zm-6.599 7c0 1.6 1.744 2.625 2.599 3h-12c.938-.333 2.599-1.317 2.599-3h6.802z" />
           </svg>


            <div className="admission-name-container">
              <div className='applicant-name-container' style={{userSelect:'none'}} onClick={handleExpandClick}>
                <h1 className="admission-header-name" style={{pointerEvents:'none'}}>
                    {name} 
                </h1> 
                <svg className={expanded ? 'settings-arrow main-settings-arrow' : 'settings-arrow main-settings-arrow'} fill='currentColor' height='20' width='20' xmlns='http://www.w3.org/2000/svg'>
                  <path d='m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z'></path>
                </svg>   
              </div>

              <h4 className="admission-second-header-name">
              <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: 16, height: 16 }}
                    >
                    <path
                        d="m21.011 8.498h-18.009c-.569 0-1.001.464-1.001.999 0 .118-.105-.582 1.694 10.659.077.486.496.842.988.842h14.635c.492 0 .911-.356.988-.842 1.801-11.25 1.693-10.54 1.693-10.66 0-.553-.449-.991-.988-.998zm-.92 3.5-1.2 7.5h-13.782l-1.2-7.5zm-.076-6.517h-16.029c-.524 0-1.001.422-1.001 1.007 0 .081-.011.016.139 1.01h17.752c.152-1.012.139-.931.139-1.009 0-.58-.469-1.008-1-1.008zm-15.973-1h15.917c.057-.436.054-.426.054-.482 0-.671-.575-1.001-1.001-1.001h-14.023c-.536 0-1.001.433-1.001 1 0 .056-.004.043.054.483z"
                        fillRule="nonzero"
                    />
                </svg>

                <span>{submissions} Submission{submissions != 1 && "s"}</span>
              </h4>
            </div>
          </div>
          
        </div>
        <div className='accounts-btn-wrapper'>
            <button className="account-edit-button" onClick={()=>setDeleteTestDisplayed(true)}>
              <svg className='edit-svg' clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
              <span className="account-edit-text">Delete</span>
            </button>

            
            <button className={`account-edit-button${isOptionsOpen ? " post-options-button-open" : ""}`} ref={editOptionsButtonRef} onClick={()=>setIsOptionsOpen(!isOptionsOpen)}>
              <svg className='edit-svg' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z' fillRule='nonzero' />
              </svg>
              <span className="account-edit-text">Edit</span>
            </button>
          </div>
      </div>
      
      { readyToRender &&
      <ExpandableInfoBlock expanded={expanded}>
        <div className="hr" style={{ margin: "20px 0px", width: "100%" }} />
        <div className="account-full-info-container">
        <div className='account-full-info-container' style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="account-block-inside-header">Information</h3>
            <div className='account-full-info'>
            <div className="info-section" style={{width: "100%"}}>
                <div className="info-block">
                  <h3>Test name</h3>
                  <h2>{name}</h2>
                </div>
            </div>

            <div className="info-section" style={{width: "100%"}}>
                <div className="info-block">
                  <h3>Test sections</h3>
                  <h2>{sections.map((section, i)=><span key={i}>{section.displayName}{i < sections.length - 1 && ", "}</span>)}</h2>
                </div>
            </div>
            
            <div className="info-section">
                <div className="info-block">
                  <h3>Type</h3>
                  <h2>{type.toUpperCase()}</h2>
                </div>
            </div>
            <div className="info-section">
                <div className="info-block">
                  <h3>Interface</h3>
                  <h2>{test_interface.toUpperCase()} Interface</h2>
                </div>
            </div>
            {timer && 
            <div className="info-section">
                <div className="info-block">
                    <h3>Timer</h3>
                    <h2>{timer}</h2>
                </div>
            </div> }
            <div className="info-section">
                <div className="info-block">
                    <h3>Release date</h3>
                    <h2>{release_date}</h2>
                </div>
            </div>
            
              
            </div>
          </div>
          <h3 className="account-block-inside-header">Submissions</h3>
          <div className="account-test-info-container">
          <AdditionalInfoBlock title='Test History' setOpen={setOpenTestsSuperExpander} height={1409}>
                    <div className="super-expanded-container">

                      <div className="account-graphs-container">
                        

                        <TestBarChartContainer ready={showCharts} test={id} type={type} accounts={true}/>

                        <TestDonutChartContainer ready={showCharts} test={id} type={type} accounts={true}/>

                        
                      </div>
                      
                      
                    
                      <div className="account-test-history-container">
                              <TestHistoryContainer ready={showCharts} type={type} test={id}/>
                      </div>
                    </div>
                  </AdditionalInfoBlock>
          </div>
        
        </div>
      </ExpandableInfoBlock>
      }
    </div>
  )
}

export default TestBlock;
