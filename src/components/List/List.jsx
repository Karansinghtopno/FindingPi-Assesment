import React, { useEffect, useState } from "react";
import classes from "./List.module.css";
import nodata from "../../assets/No_data.png"

const List = ({
  employees,
  handleEdit,
  handleDelete,
  inputSearch,
  setInputSearch,
}) => {
  // console.log("list conmponetn", employees);

  const [sortedlist, setSortedList] = useState(employees);

  const [sortedValue, setSortedValue] = useState("a-z");

  const sortEmployee = () => {
    if (sortedValue === "a-z") {
      let tempList = [
        ...employees.sort((a, b) => a.name.first.localeCompare(b.name.first)),
      ];
      console.log("a-z");
      console.log(tempList);
      setSortedList(tempList);
    }
    if (sortedValue === "z-a") {
      let tempList = [
        ...employees.sort((a, b) => b.name.first.localeCompare(a.name.first)),
      ];
      console.log(tempList);
      console.log("z-a");

      setSortedList(tempList);
    }
    if (sortedValue === "ageAsc") {
      console.log("age from ascending");
      let tempList = [...employees.sort((a, b) => a.dob.age - b.dob.age)];
      setSortedList(tempList);
    }
    if (sortedValue === "ageDesc") {
      console.log("Age from descinding");

      let tempList = [...employees.sort((a, b) => b.dob.age - a.dob.age)];
      setSortedList(tempList);
    }
  };

  useEffect(() => {
    sortEmployee();
  }, [sortedValue,inputSearch]);

  return (
    <>
      <h1 className={classes.heading}>Person's List</h1>
      {/* search Bar */}
      <div className={classes.searchbar}>
        <input
          type=""
          placeholder="Search Person"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </div>
      <form className={classes.sort}>
        <label htmlFor="sort">Sort Person:</label>
        <select
          name="sort"
          value={sortedValue}
          onChange={(e) => setSortedValue(e.target.value)}
        >
          <option value="a-z"> First Name (a-z)</option>
          <option value="z-a">First Name (z-a)</option>
          <option value="ageAsc">Age (low-high)</option>
          <option value="ageDesc">Age (high-low)</option>
        </select>
      </form>
      {/* list Component */}
      <div className={classes.listContainer}>
        <div className={classes.tableHead}>
          <div className={classes.id}>
            <h4>SL</h4>
          </div>
          <div className={classes.avatar}>
            <h4>Avatar</h4>
          </div>
          <div className={classes.firstName}>
            <h4>First Name</h4>
          </div>
          <div className={classes.lastName}>
            <h4>Last Name</h4>
          </div>
          <div className={classes.phone}>
            <h4>Phone</h4>
          </div>
          <div className={classes.age}>
            <h4>Age</h4>
          </div>
          <div className={classes.email}>
            <h4>Email</h4>
          </div>
          <div className={classes.actions}>
            <h4>Actions</h4>
          </div>
        </div>
        <div>
          {sortedlist.length > 0 ? (
            <>
              {sortedlist.map((emp, index) => {
                return (
                  <div className={classes.tabeBody} key={emp.id.value}>
                    <div className={classes.bodyId}>
                      <p>{index + 1}</p>
                    </div>
                    <div className={classes.bodyAvatar}>
                      <img
                        className={classes.avatar}
                        src={emp.picture.large}
                        alt="avatar"
                      />
                    </div>
                    <div className={classes.bodyFirstName}>
                      <p>{emp.name.first}</p>
                    </div>
                    <div className={classes.bodyLastName}>
                      <p>{emp.name.last}</p>
                    </div>
                    <div className={classes.bodyPhone}>
                      <p>{emp.phone}</p>
                    </div>
                    <div className={classes.bodyAge}>
                      <p>{emp.dob.age}</p>
                    </div>
                    <div className={classes.bodyEmail}>
                      <p>{emp.email}</p>
                    </div>
                    <div className={classes.bodyActions}>
                      <button
                        className={classes.btnEdit}
                        onClick={() => handleEdit(emp.email)}
                      >
                        Edit
                      </button>
                      <button
                        className={classes.btnDel}
                        onClick={() => handleDelete(emp.email)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          ):(<div className={classes.nodata}>
          <img src={nodata} alt="nodata" />
          <h2>No Data</h2>
          </div>)}
        </div>
      </div>
    </>
  );
};

export default List;
