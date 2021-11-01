import React from 'react';

const Select =({ name,label,options,error, ...rest}) => { 
    return ( 
        <div className ="form-group" m> 
        <label htmlFor={name}> {label}</label>
        <select name={name} id={name} {...rest} className="form-select mb-3" aria-label="Default select example">
  
  <option value="" / >
 
  {options.map(option => ( 
      <option key={option._id} value={option._id}>
          {option.name} </option>
  ))}
  
</select>
  { error && <div className="alert alert-danger">{error} </div>}

        </div> )
}
 
export default Select;