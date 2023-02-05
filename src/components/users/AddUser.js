import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Topbar from '../../Topbar';

export default function AddUser() {

  const errorMessages = {
    id_number: "Id Number is required and length must be 13 digits",
    name: "Name is required",
    surname: "Surname is required ",
    address: "Address is required",
    date_of_birth: "Address is required",
    nationality: "Nationality is required",
  }
  const history = useHistory();

  const [errors,SetErrors] = useState([])
  const [formData, setFormData] = useState({
    id: null,
    id_number: null,
    name: null,
    surname: null,
    address: null,
    date_of_birth: null,
    nationality: null,
  });

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
      let tempErrors = []
      for(const [k,v] of Object.entries(errorMessages)){
        if (formData[k] === '' 
          || formData[k] === undefined 
          || formData[k] === null){
            tempErrors.push(v)
          }
      }
      
      if(formData.id_number.length !== 13){
        tempErrors.push(errorMessages.id_number)
      }
        
      console.log(errors)
      SetErrors(tempErrors)
      
      if(errors.length > 0){
        return;
      }
    axios.post('http://localhost:3001/api/user', formData).then((res) => {
      console.log('user successfully created')
      history.push('/')
    });
  }

  return (
    <div className="App">
      <Topbar />
      <h1>Registration</h1>
      <div className="form">
      {errors.length > 0 &&  
      (<div className="alert alert-danger ">
        {errors.map((error,i ) => <pre id={i}>{error}</pre>)}
      </div>)}
        <div className="mb-3">
          <label htmlFor="id_number" className="form-label">ID Number</label>
          <input type="text" className="form-control" id="id_number"
            name="id_number"

            onChange={(e) => {
              handleChange(e)
            }} />
        </div><br />

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name"
            name="name"
            onChange={(e) => {
              handleChange(e)
            }} />
        </div><br />

        <div className="mb-3">
          <label htmlFor="surname" className="form-label">Surname</label>
          <input type="text" className="form-control" id="surname"
            name="surname"
            onChange={(e) => {
              handleChange(e)
            }} />
        </div><br />

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea className="form-control" id="address" rows="3"
            name="address"
            onChange={(e) => {
              handleChange(e)
            }}></textarea>
        </div><br />

        <div className="mb-3">
          <label htmlFor="date_of_birth" className="form-label">Date of birth</label>
          <input type="text" className="form-control" id="date_of_birth"
            name="date_of_birth"
            onChange={(e) => {
              handleChange(e)
            }} />
        </div><br />

        <div className="mb-3">
          <label htmlFor="nationality" className="form-label">Nationality</label>
          <input type="text" className="form-control" id="nationality"
            name="nationality"
            onChange={(e) => {
              handleChange(e)
            }} />
        </div><br />

        <button className='btn btn-primary' onClick={submit}>Submit</button>
      </div>
    </div>
  );
}
