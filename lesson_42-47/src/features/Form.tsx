import { useRef, useState, type SubmitEvent } from "react";
import "./form.css";

type Person = {
  name: string;
  age: string | number;
};

export const Form = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const [person, setPerson] = useState<Person>({ name: "", age: "" });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newPerson: Person = {
      name: nameRef.current?.value || "Ryan Gosling",
      age: Number(ageRef.current?.value) || 69,
    };

    setPerson(newPerson);

    console.log(newPerson);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-element">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          onChange={(event) => {
            // console.log(event.currentTarget.value);
            setPerson({ ...person, name: event.currentTarget.value });
          }}
          value={person.name}
          ref={nameRef}
          id="name"
          type="text"
          className="form-input"
          placeholder="Your name"
        />
      </div>
      <div className="form-element">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          onChange={(event) => {
            // console.log(event.currentTarget.value);
            setPerson({ ...person, age: Number(event.currentTarget.value) });
          }}
          value={person.age}
          ref={ageRef}
          id="age"
          type="number"
          className="form-input"
          placeholder="Your age"
        />
      </div>
      <div className="form-element">
        <button className="form-button">Submit</button>
      </div>
    </form>
  );
};
