import React, { useRef, useState, useEffect } from 'react';
import SearchResult from './SearchResult';
import Errors from '../Window/Errors';


function SearchBar() {
  const [error, setError] = useState({error: null, message: null});

  const searchBar = useRef();
  const searchBarWrapper = useRef();
  const searchTimeOut = useRef();
  const searchInputTimeOut = useRef();
  const xhrRef = useRef();
  const [searchMenu ,setSearchMenu]  = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);


  function handleSearchInput(){
    clearTimeout(searchInputTimeOut.current);
    if(searchBar.current.value.length >= 4){
      searchInputTimeOut.current = setTimeout( ()=>startSearch(), 1000);
    } else {
      abortSearch();
      setSearchMenu(false);
    }
    
  }
  
  
  function startSearch(){
    abortSearch();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/back/search.php");
    xhr.onerror = () => searchTimeOut.current = setTimeout( ()=>startSearch(), 2000);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrRef.current = xhr;
    setSearchMenu(true);
    search();
  }

  function abortSearch(){
      const xhr = xhrRef.current;
      xhr.abort(); 
  }

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/back/search.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrRef.current = xhr;

    // This code runs after the component mounts
    searchBar.current.addEventListener('focus', () => {
      if(searchBar.current.value.length >= 4){
        startSearch();
      } else {
        abortSearch();
        setSearchMenu(false);
      }
    });

    /*searchBar.current.addEventListener('blur', (e) => {
      console.log(e.relatedTarget)
      abortSearch();
      setSearchMenu(false);
    });*/


    document.addEventListener('mousedown', function(event){
      if(searchBarWrapper.current){
        if(!searchBarWrapper.current.contains(event.target)){
          abortSearch();
          setSearchMenu(false);
        } 
      }
    });

    
    }, []);

  function search(){
    setSearchResults([]);
    clearTimeout(searchTimeOut.current);
    setSearchLoading(true);
    const xhr = xhrRef.current;
    xhr.send(`query=${encodeURIComponent(searchBar.current.value)}`);
    xhr.onload = function(){
      if(xhr.status == 200){
        try {
          let response = JSON.parse(xhr.responseText);
          setSearchResults(response);
          setSearchLoading(false);
        } catch(err){
          setError({error: "parse", message: `ON_CATCH ${xhr.status}`});
        }
      } else {
        setError({error: "connection", message: `ON_NOT_200 ${xhr.status}`});
      }
    }
  }

  
  /*const searchResults = [
    {
      firstName: "Mohammed",
      lastName: "Mahmoud",
      postText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      pfp: "/back/profiles/66f46ec9433ab.jpg",
      date: "2 minutes ago",
      type: "image"
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      postText: "Join us for the annual science fair.",
      pfp: "/back/profiles/66f46ec9433ab.jpg",
      date: "10 minutes ago",
      type: "event",
      title: "Annual Science Fair"
    },
    {
      firstName: "John",
      lastName: "Smith",
      postText: "Aenean lacinia bibendum nulla sed consectetur.",
      pfp: "/back/profiles/66f46ec9433ab.jpg",
      date: "1 hour ago",
      type: "document"
    },
    {
      firstName: "Emily",
      lastName: "Johnson",
      postText: "Complete the math homework by Friday.",
      pfp: "/back/profiles/66f46ec9433ab.jpg",
      date: "Yesterday",
      type: "homework",
      title: "Math Homework"
    }
    ,
    {
      firstName: "Emily",
      lastName: "Johnson",
      postText: "Complete the math homework by Friday.",
      pfp: "/back/profiles/66f46ec9433ab.jpg",
      date: "Yesterday",
      type: ""
    }
  ];*/
  

  
  return (
    <div className="wrapper" ref={searchBarWrapper}>
      <Errors error={error} onClose={()=> setError({error: null, message: null})}/>

     {
     searchMenu && 
        <div className="search-menu">
          {searchResults.map((result, i)=><SearchResult {...result} key={result["post_id"]} close={()=>setSearchMenu(false)}/>)}
          {(searchResults.length <= 0 && !searchLoading ) &&
            <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "125px"
                }}
              >
                <h1 style={{ fontSize: 16, fontWeight: 500 }}>
                  No results.
                </h1>
            </div>
          }
          { searchLoading &&
            <div className="search-result" style={{pointerEvents: "none"}}>
              <div className="skeleton-search" style={{width: "100%"}} />
            </div>
          }
          
          
        </div>
      }
      <div className="searchBar"> 
        <input ref={searchBar} onChange={handleSearchInput} id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" autoComplete="off"/>
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
            <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
