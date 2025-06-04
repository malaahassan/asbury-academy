import React, { useState, useRef } from 'react'
import AdditionalInfoBlock from './AdditionalInfoBlock';
import ExpandableInfoBlock from './ExpandableInfoBlock';

import AuthorizedTable from './AuthorizedTable';
import DropDown from '../Tools/DropDown';
import EditGroupWindow from '../Window/EditGroupWindow';
import SureWindow from '../Window/SureWindow';
import { useXHR } from "../Contexts/UseXHR";




const GroupBlock = ({
  id,
  name,
  students,
  description,
  description_exists,
  tests,
  videos,
  dropdown_subjects,
  dropdown_tests,
  dropdown_videos,
  refetch
}) => {
  const { sendRequest } = useXHR();
  const [editGroupWindow, setEditGroupWindow] = useState(false);
  const [deleteGroupDisplayed, setDeleteGroupDisplayed] = useState(false);
  
  const [expanded, setExpanded] = useState(false);
  const [testFilter, setTestFilter] = useState("act");

  const deleteTimeout = useRef();
  

  function handleDeleteClick(e){
    e.target.style.pointerEvents = "none";
    e.target.style.opacity = "0.5";
    sendRequest(
      ()=>{
        
      },
      "/back/delete_group.php",
      {
        id: id
      },
      deleteTimeout,
      () => {
        refetch();
        setDeleteGroupDisplayed(false);
      }
      
    );
  }

  return (
    <div className={expanded ? "account-block applicant-block applicant-block-expanded" : "account-block applicant-block"}>
      { editGroupWindow &&
            <EditGroupWindow refetch={refetch} id={id} group={name} description={description_exists ? description : ""} dropdown_subjects={dropdown_subjects} dropdown_tests={dropdown_tests} dropdown_videos={dropdown_videos} default_videos={videos.map((video)=> video.id)} default_tests={tests.map((test)=> test.id)} onClose={()=>{setEditGroupWindow(false)} } />
      }
      <SureWindow display={deleteGroupDisplayed} message={`Are you sure you want to delete ${name}?`} button="Delete" onYes={handleDeleteClick} onNo={()=>setDeleteGroupDisplayed(false)}/>

      <div className="account-header">
        <div className="account-info">
          <div className="admission-headers-container">
          <svg className="admission-header-icon"
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 32, height: 32 }}
          >
            <path
              d="m2.394 15.759s7.554 4.246 9.09 5.109c.165.093.333.132.492.132.178 0 .344-.049.484-.127 1.546-.863 9.155-5.113 9.155-5.113.246-.138.385-.393.385-.656 0-.566-.614-.934-1.116-.654 0 0-7.052 3.958-8.539 4.77-.211.115-.444.161-.722.006-1.649-.928-8.494-4.775-8.494-4.775-.502-.282-1.117.085-1.117.653 0 .262.137.517.382.655zm0-3.113s7.554 4.246 9.09 5.109c.165.093.333.132.492.132.178 0 .344-.049.484-.127 1.546-.863 9.155-5.113 9.155-5.113.246-.138.385-.393.385-.656 0-.566-.614-.934-1.116-.654 0 0-7.052 3.958-8.539 4.77-.211.115-.444.161-.722.006-1.649-.928-8.494-4.775-8.494-4.775-.502-.282-1.117.085-1.117.653 0 .262.137.517.382.655zm10.271-9.455c-.246-.128-.471-.191-.692-.191-.223 0-.443.065-.675.191l-8.884 5.005c-.276.183-.414.444-.414.698 0 .256.139.505.414.664l8.884 5.006c.221.133.447.203.678.203.223 0 .452-.065.689-.203l8.884-5.006c.295-.166.451-.421.451-.68 0-.25-.145-.503-.451-.682zm-8.404 5.686 7.721-4.349 7.72 4.349-7.72 4.35z"
              fillRule="nonzero"
            />
          </svg>

            <div className="admission-name-container">
              <div className='applicant-name-container' style={{userSelect:'none'}} onClick={()=>{setExpanded(prev=>!prev)}}>
                <h1 className="admission-header-name" style={{pointerEvents:'none'}}>
                    {name} 
                </h1> 
                <svg className={expanded ? 'settings-arrow main-settings-arrow' : 'settings-arrow main-settings-arrow'} fill='currentColor' height='20' width='20' xmlns='http://www.w3.org/2000/svg'>
                  <path d='m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z'></path>
                </svg>   
              </div>

              <h4 className="admission-second-header-name">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"></path></svg> 
                <span>{students} Student{students != 1 && "s"}</span>
              </h4>
            </div>
          </div>
          
        </div>
        <div className='accounts-btn-wrapper'>
            <button className="account-edit-button" onClick={()=>setDeleteGroupDisplayed(true)}>
              <svg className='edit-svg' clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
              <span className="account-edit-text">Delete</span>
            </button>

            
            <button className="account-edit-button" onClick={()=>setEditGroupWindow(true)}>
              <svg className='edit-svg' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z' fillRule='nonzero' />
              </svg>
              <span className="account-edit-text">Edit</span>
            </button>
          </div>
      </div>
      <ExpandableInfoBlock expanded={expanded}>
        <div className="hr" style={{ margin: "20px 0px", width: "100%" }} />
        <div className="account-full-info-container">
        <div className='account-full-info-container' style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="account-block-inside-header">Group Info.</h3>
            <div className='account-full-info'>
            <div className="info-section"  style={{width:'100%'}}>
                <div className="info-block">
                  <h3>Full name</h3>
                  <h2>{name}</h2>
                </div>
              </div>
              <div className="info-section"  style={{width:'100%'}}>
                <div className="info-block">
                  <h3>Description</h3>
                  <h2>{description}</h2>
                </div>
              </div>
            </div>
          </div>
          <h3 className="account-block-inside-header">Authorization</h3>
          <div className="account-test-info-container">
            <AdditionalInfoBlock title='Authorized Tests' height={165 + Math.max(tests.filter((elem) => elem.type == testFilter).length, 4)*67}>
              <div className="super-expanded-container" style={{minHeight: 260}}>
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
                              menuId={`test-table-filter-${id}`}
                        />
                  </div>
                <AuthorizedTable type_name="TEST" subjects={tests.filter((elem) => elem.type == testFilter)}/>
              </div>
            </AdditionalInfoBlock>
            <AdditionalInfoBlock title='Authorized Videos'>
              <div className="super-expanded-container">
                <AuthorizedTable type_name="VIDEO" subjects={videos}/>
              </div>
            </AdditionalInfoBlock>
          </div>
        
        </div>
      </ExpandableInfoBlock>
    </div>
  )
}

export default GroupBlock;
