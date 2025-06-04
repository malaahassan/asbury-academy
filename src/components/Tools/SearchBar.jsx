

function SearchBar({onChange}) {
    return (
        <div className="wrapper">
            <div className="searchBar">
                <input onChange={onChange} className="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" autoComplete="off" />
                <button className="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                    <svg viewBox="0 0 24 24" style={{width: 24, height: 24}}>
                        <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
    );
  }
  
  export default SearchBar;
  