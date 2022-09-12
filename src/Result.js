import { useEffect, useState } from "react";

const Result = (props) => {
  const [person, setPerson] = useState("");
  const [message, setMessage] = useState("");
  const people = require("./people.json");
  const age = props.age;

  useEffect(() => {
    // Get people who were older than input age
    const olderPeople = people.filter((person) => {
      return age < person["acc date:"] - person["yob:"];
    });

    // Get random person from array above
    const olderPerson =
      olderPeople[Math.floor(Math.random() * olderPeople.length)];

    const olderPersonName = olderPerson["name:"];
    const olderAge = olderPerson["acc date:"] - olderPerson["yob:"];
    const accomplishment = olderPerson["accomplishment:"];

    setPerson(olderPerson);
    setMessage(
      "At " + olderAge + " years old, " + olderPersonName + " " + accomplishment
    );
  }, [age]);

  return (
    <div className="result">
      {console.log(person)}
      {message}
    </div>
  );
};

export default Result;
