import { useState, useEffect, useRef } from "react";
import "./App.css";

export function UncontrolledInput({ label, type = "text" }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.omdbapi.com/?apikey=73eb1fea&i=tt0780504&plot=full");

        if (!response.ok) {
          console.log(response);
          return response.status;
        }

        const data = await response.json();
        const fetchedName = data.Actors ? data.Actors.split(",")[0] : "Batman";

        inputRef.current.placeholder = fetchedName;

        console.log(fetchedName);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = inputRef.current.value;

    if (text.length < 1) {
      console.log("The query is empty");
    } else {
      console.log(text);
    }
  };

  return (
    <form className="input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="testForm" className="input-label">
        {label}
      </label>
      <input id="testForm" ref={inputRef} className="input-field" type={type} />
    </form>
  );
}

export function ControlledInput({ label, type = "text" }) {
  const [name, setName] = useState("");
  const [fetchedName, setfetchedName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.length < 1) {
      console.log("The query is empty");
    } else {
      console.log(name);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.omdbapi.com/?apikey=73eb1fea&i=tt0780504&plot=full");

        if (!response.ok) {
          console.log(response);
          return response.status;
        }

        const data = await response.json();

        const fetchedData = data.Actors ? data.Actors.split(",")[0] : "Batman";
        setfetchedName(fetchedData);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    fetchData();
  }, []);

  return (
    <form className="input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="testForm" className="input-label">
        {label}
      </label>
      <input
        id="testForm"
        className="input-field"
        type={type}
        value={name}
        placeholder={fetchedName}
        onChange={handleChange}
      />
    </form>
  );
}
