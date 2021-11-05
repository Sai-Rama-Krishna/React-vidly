import React from 'react';


const SearchBox = ({value,onChange}) => {
    return ( 
    <div className="active-cyan-3 active-cyan-4 mb-4">
    <input 
    className="form-control my-3"
    name="query"
    value={value}
     type="text"
      placeholder="Search"
       aria-label="Search"
       onChange={e => onChange(e.currentTarget.value)}
       />
  </div> );
}
 
export default SearchBox;
