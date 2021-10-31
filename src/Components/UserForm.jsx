import React, { useState } from "react";
import { mobileRegex, emailRegex } from "./Regex";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const UserForm = () => {
  const [data, setData] = useState({
    fields: {
      name: "",
      email: "",
      gender: "",
      mobile: "",
      stream: "",
    },
    errors: {},
  });
 
  const handleChange = (e) => {
    data.fields[e.target.name] = e.target.value; //setting form data
    setData({ ...data }); //other stuff as it is 
    if(data.errors[e.target.name]){ //if there is some error and again we start type then error goes
        data.errors[e.target.name]='';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate()){
        toast.success('Data submitted successfully'); // if validation is correct and returning true
    }
  };

  const validate = () => {
    let fields = data.fields; //assigning form data to local variable for making things easier
    let errors = {};
    let formIsValid = true;
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your Name.";
    }
    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["name"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      if (!emailRegex.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["mobile"]) {
      formIsValid = false;
      errors["mobile"] = "*Please enter your mobile no.";
    }


    if (typeof fields["mobile"] !== "undefined") {
        if (!mobileRegex.test(fields["mobile"])) {
          formIsValid = false;
          errors["mobile"] = "*Please enter valid mobile no.";
        }
      }

      if (!fields["gender"]) {
        formIsValid = false;
        errors["gender"] = "*Please choose your gender.";
      }
      if (!fields["stream"]) {
        formIsValid = false;
        errors["stream"] = "*Please choose your stream.";
      }
      
      data.errors=errors; //assigning local errors variable to form errors which contains name and type of error
      setData({...data});// other stuff as it is
      return formIsValid;

  };

  return (
    <div className="form-section">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
          />
          <br />
          {data.errors.name && <small>{data.errors.name}</small>}  {/* showing the type of the error  */}
        </div>
        <div className="form-control">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <br />
         { data.errors.email &&<small>{data.errors.email}</small>}
        </div>
        <div className="form-control gender-inp">
          <label>choose your gender</label>
          <br />
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
          />
          Female
          <input
            type="radio"
            name="gender"
            value="Other"
            onChange={handleChange}
          />
          other
          <br />
          {data.errors.gender &&<small>{data.errors.gender}</small>}
        </div>
        <div className="form-control">
          <input
            name="mobile"
            type="text"
            placeholder="Enter your mobile number"
            onChange={handleChange}
          />
          <br />
          {data.errors.mobile &&<small>{data.errors.mobile}</small>}
        </div>
        <div className="form-control stream-select">
          <label>Select stream</label> <br />
          <select name="stream" id="" defaultValue="select stream" onChange={handleChange}>
            <option value="select stream" disabled>
              select stream
            </option>
            <option value="CSE">CSE</option>
            <option value="ME">ME</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
          </select>
          <br />
          {data.errors.stream && <small>{data.errors.stream}</small>}
        </div>
        <button className="btn btn-submit btn-success">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
