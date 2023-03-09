import React, { useState, useRef, useEffect } from "react";
import classes from "./Edit.module.css";
import Swal from "sweetalert2";

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {

  const EMAIL = selectedEmployee.email;
  // console.log(EMAIL)
  // console.log(`selected Employee`  , selectedEmployee)
  const [firstName, setFirstName] = useState(selectedEmployee.name.first);
  const [lastName, setLastName] = useState(selectedEmployee.name.last);
  const [phone, setPhone] = useState(selectedEmployee.phone);
  const [age, setAge] = useState(selectedEmployee.dob.age);
  // console.log(firstName,lastName,phone,age)
  const inpuRef = useRef(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    // console.log("submit")

    if (!firstName || !lastName || !phone || !age) {
      return Swal.fire({
        icon: "error",
        title: "error",
        text: "All field are requierd",
        showConfirmButton: true,
      });
    }

    // making new Object
    const updatedEmployee = {
      ...selectedEmployee,
      name: { ...selectedEmployee.name, first: firstName, last: lastName },
      phone: phone,
      dob: { ...selectedEmployee.dob, age: age },
    };
    
    const newEmployList = employees.map(emp=>{
      if(emp.email=== EMAIL){
        return updatedEmployee
      }
      return emp
    })

    // console.log(updatedEmployee);
    console.log(newEmployList)
    setEmployees(newEmployList)
    setIsEditing(false);
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    inpuRef.current.focus();
  }, []);

  return (
    <div className={classes.cotainer}>
      <div className={classes.wrapper}>
        <h1 className={classes.heading}>Edit Person Details</h1>
        <div className={classes.form}>
          <form onSubmit={handleUpdate}>
            <div className={classes.inputFeild}>
              <label htmlFor="firstName">First Name</label>
              <input
                ref={inpuRef}
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={classes.inputFeild}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={classes.inputFeild}>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={classes.inputFeild}>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "30px" }}>
              <input type="submit" value="Update" className={classes.update} />
              <input
                className={classes.cancel}
                style={{ marginLeft: "12px" }}
                type="button"
                value="Cancel"
                onClick={() => setIsEditing(false)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
