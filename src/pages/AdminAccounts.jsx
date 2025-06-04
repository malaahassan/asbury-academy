import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import AccountBlock from '../components/Admin/AccountBlock';
import {useEffect, useRef, useState, useContext } from 'react';
import DropDown from '../components/Tools/DropDown';
import NotFoundBlock from '../components/Admin/NotFoundBlock';
import CreateAccountSecondWindow from '../components/Window/CreateAccountSecondWindow';
import { LoginContext } from '../components/Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import AccountSkeleton from '../components/Skeletons/AccountSkeleton';
import SearchBar from '../components/Tools/SearchBar';
import { useXHR } from "../components/Contexts/UseXHR";



function AdminAccounts() {
  const { sendRequest } = useXHR();
  
  const navigate = useNavigate();
  const { logData, setLogData } = useContext(LoginContext);

  const [groups, setGroups] = useState([]);
  const [groupsForWindow, setGroupsForWindow] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectsSections, setSubjectsSections] = useState([]);
  const [subjectsAndSections, setSubjectsAndSections] = useState([]);

  const [filtersLoading, setFiltersLoading] = useState(false);

  const [accounts, setAccounts] = useState([]);
  const [myAccount, setMyAccount] = useState(null);
  const [loadedStatus, setLoadedStatus] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const containerRef = useRef();
  const sentinelRef = useRef();

  const accountsLoadingRef = useRef(false);
  const accountsTimeout = useRef();
  const subjectsTimeout = useRef();
  const accountsCountRef = useRef(0);

  const [accountType, setAccountType] = useState('student');
  const [groupType, setGroupType] = useState('all');
  const [selectedSubject, setSelectedSubject]= useState('all');

  const[ createAccountSecondWindow, setCreateAccountSecondWindow] = useState(false);
  const[ createAccountSecondWindowRole, setCreateAccountSecondWindowRole] = useState("student");

  const timeOutRef = useRef(null)
  const filter = useRef({
    group: groupType,
    searchBar: ""
  });

  function resetAccounts(){
      accountsCountRef.current = 0;
      accountsLoadingRef.current = true;
      setLoadedStatus(false);
      setAccounts([]);
      getAccounts();
  }

  useEffect(() => {
      filter.current.group = groupType;
      resetAccounts();
    },[groupType]);

  useEffect(() => {
    if(!logData.admin){
      navigate('/404');
    }
    // This code runs after the component mounts
    const handleScroll = () => {
      if (!containerRef.current || !sentinelRef.current) return;

      const container = containerRef.current;
      const skeleton = sentinelRef.current;

      const containerBottom = container.scrollTop + container.clientHeight;
      const skeletonTop = skeleton.offsetTop;

      const offset = 50; // Adjust how early you want to trigger

      if (containerBottom >= skeletonTop - offset && !accountsLoadingRef.current) {
        getAccounts();
      }
    };

    //getSubjects();

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

  /*function getSubjects(){
    clearTimeout(subjectsTimeout.current);
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/back/filter_values.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onerror = () => subjectsTimeout.current = setTimeout( ()=>getAccounts(), 2000);
    xhr.onload = function(){
      if(xhr.status == 200){
        try {
          let response = JSON.parse(xhr.responseText);
          setFiltersLoading(false);
          setSubjects(response[0]);
          setSubjectsSections(response[1]);
          setGroups(response[2]);
          setSubjectsAndSections(response[3]);
          setGroupsForWindow(response[4]);
        } catch(err){
          setError({error: "parse", message: `ON_CATCH ${xhr.status}`});
        }
      } else {
        setError({error: "connection", message: `ON_NOT_200 ${xhr.status}`});
      }
    }
  }*/


  function getAccounts(){


    sendRequest(
      ()=>{
        accountsLoadingRef.current = true;
      },
      "/back/accounts.php",
      {
        limit: accountsCountRef.current + 10,
        filter: JSON.stringify(filter.current)
      },
      accountsTimeout,
      (response) => {
        setAccounts(response[1]);
        setGroups([{value: "all", displayName: "All groups"}, {value: "null", displayName: "No group"}, ...response[2]]);
        setGroupsForWindow(response[2]);
        setFirstLoad(true);
        accountsCountRef.current = response[1].length;
        /*if(response[0] <= 0){
          navigate('/404');
        }*/
        if(response[1].length == response[0]){
          accountsLoadingRef.current = true;
          setLoadedStatus(true);
        }
      },
      () => {
        accountsLoadingRef.current = false;
      },
      {},
      () => {
        accountsLoadingRef.current = true;
      }
      
    );
  }



function onInputChange(e){
    filter.current.searchBar = e.target.value;
    clearTimeout(timeOutRef.current)
    timeOutRef.current = setTimeout(()=>{
      resetAccounts();
    }, 800);
}




    return (
      
        <div className="inner-content">
          
          
          { createAccountSecondWindow &&
            <CreateAccountSecondWindow refetch={getAccounts} dropdown_groups={groupsForWindow} onClose={()=>{setCreateAccountSecondWindow(false)} } />
          }

          <Sidebar page='admin-accounts'/>
          <div className="inner-content-with-header">
            <Header />
          
            <div className='admin-container' ref={containerRef}>
                <div className='accounts-container-header'>
                  {/*<h3 className="accounts-header">My Account</h3>
                  { myAccount &&
                    <AccountBlock {...myAccount} refetch={getAccounts} dropdown_sections={subjectsSections} dropdown_subjects={subjectsAndSections} dropdown_classes={classesForWindow}/>
                  }
                  <div className="account-block" style={{display: firstLoad?"none":"block"}}>
                    <div className="skeleton-account" />
                  </div>*/}
                  <h3 className="accounts-header">Accounts</h3>
                  <div className='filters-container'>

                      {/* <DropDown
                        options={[
                          { value: 'all', displayName: 'All grades' },
                          { value: '9', displayName: 'Grade 9' },
                          { value: '10', displayName: 'Grade 10' },
                          { value: '11', displayName: 'Grade 11' },
                          { value: '12', displayName: 'Grade 12' },
                        ]}
                        value={gradeType} // Controlled value
                        onChange={setGradeType} // Handler to update the state
                        sections={[]}
                        menuId={'grade-filter'}
                      /> */}
                      
                      <SearchBar onChange={onInputChange} />
                      <DropDown
                        loading={filtersLoading}
                        options={groups}
                        value={groupType}
                        onChange={setGroupType} 
                        sections={[]}
                        menuId={'group-filter'}
                      />
                      <button  className='create-account-btn' onClick={()=>{setCreateAccountSecondWindow(true)}}>  
                        <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero"/></svg>
                        <span>Create account</span>
                      </button>
                  </div>
                </div>
                {accounts.map((account, index) => <AccountBlock key={account.user_id} refetch={getAccounts} {...account} dropdown_groups={groupsForWindow}/>)}
                {
                  (accounts.length == 0 && loadedStatus) &&
                  <NotFoundBlock />
                }
                <div ref={sentinelRef} style={{display: loadedStatus?"none":"block"}}>
                  <AccountSkeleton />
                  <AccountSkeleton />
                  <AccountSkeleton />
                </div>
            
              
            </div>

          </div>

        </div>
    );
  }
  
export default AdminAccounts;