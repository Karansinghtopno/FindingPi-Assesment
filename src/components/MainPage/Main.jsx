import React, { useState } from "react";
import Edit from "../EditPage/Edit";
import List from "../List/List";
import Swal from "sweetalert2";

import classes from "./Main.module.css";

const Main = ({ members }) => {
  console.log(members);
  const [employees, setEmployees] = useState(members);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputSearch, setInputSearch] = useState("");


  const search = (data) => {
    return data.filter(
      (item) =>
        item.name.first.toLowerCase().includes(inputSearch) ||
        item.name.last.toLowerCase().includes(inputSearch) ||
        item.email.toLowerCase().includes(inputSearch)
    );
  };

  const handleEdit = (email) => {
    console.log("handle Edit", email);
    const [employee] = employees.filter((emp) => emp.email === email);
    // console.log(employee);
    setSelectedEmployee(employee);
    console.log(selectedEmployee);
    setIsEditing(true);
  };
  const handleDelete = (email) => {
    // console.log(email)
    Swal.fire({
      icon: "warning",
      title: "Are you Sure",
      text: "You won't be able to revert this",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No , cancel",
    }).then((result) => {
      if (result.value) {
        const [employee] = employees.filter(
          (employee) => employee.email === email
        );
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: `${employee.name.first} ${employee.name.last} data has been deleted`,
          showConfirmButton: "false",
          timer: 1500,
        });

        setEmployees(employees.filter((employee) => employee.email !== email));
      }
    });
  };


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {isEditing && (
          <Edit
            employees={employees}
            selectedEmployee={selectedEmployee}
            setEmployees={setEmployees}
            setIsEditing={setIsEditing}
          />
        )}
        {!isEditing && (
          <div>
            <List
              employees={search(employees)}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              inputSearch={inputSearch}
              setInputSearch={setInputSearch}
          
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
