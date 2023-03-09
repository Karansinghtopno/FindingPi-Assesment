import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Loading from "./components/Loading/Loading";
import Error from "./components/ErrorPage/Error";
import Main from "./components/MainPage/Main";

const URL = ` https://randomuser.me/api/?results=10`;

function App() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async (URL) => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL);
      console.log(response.data.results);
      if (response.data.results) {
        setIsLoading(false);
        setIsError(false);
        setMembers(response.data.results);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData(URL);
  }, [URL]);

  // console.log(members)
  return (
    <div className="container">
      <div>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : (
          <Main members={members} />
        )}
      </div>
    </div>
  );
}

export default App;
