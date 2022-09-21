import "./App.css";
import Intro from "./Intro";
import Result from "./Result";
import Background from "./Background";
import { useState } from "react";
import intervalToDuration from "date-fns/intervalToDuration";
import { isBefore, set } from "date-fns";
import { Flex } from "@chakra-ui/react";

function App() {
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBirthdayValid, setIsBirthdayValid] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [person, setPerson] = useState("");
  const [message, setMessage] = useState("");
  const people = require("./people.json");

  const setPersonAndMessage = (age) => {
    if (age > 100) {
      setMessage(
        "Okay, maybe you are old. Perhaps it's time to kick back and relax"
      );
      return;
    }

    // Get people who were older than input age
    const olderPeople = people.filter((person) => {
      return age < person["accDate"] - person["yob"];
    });

    // Get random person from array above
    const olderPerson =
      olderPeople[Math.floor(Math.random() * olderPeople.length)];

    const olderPersonName = olderPerson["name"];
    const olderAge = olderPerson["accDate"] - olderPerson["yob"];
    const accomplishment = olderPerson["accomplishment"];

    setPerson(olderPerson);

    setMessage(
      "At " + olderAge + " years old, " + olderPersonName + " " + accomplishment
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!birthday) {
      setShowErrorMessage(true);
      return;
    }
    const isDateBeforeTomorrow = isBefore(new Date(birthday), new Date());
    const age = intervalToDuration({
      start: new Date(birthday),
      end: new Date(),
    }).years;
    if (isDateBeforeTomorrow && age < 123) {
      setIsBirthdayValid(true);
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
      return;
    }

    setAge(age);
    setIsSubmitted(true);
    setPersonAndMessage(age);
  };

  const handleChange = (e) => {
    setBirthday(e.target.value);
  };

  return (
    <Flex
      h={"100vh"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {isSubmitted && isBirthdayValid ? (
        <Result
          person={person}
          message={message}
          age={age}
          birthday={birthday}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          showErrorMessage={showErrorMessage}
        />
      ) : (
        <Intro
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          birthday={birthday}
          showErrorMessage={showErrorMessage}
        />
      )}
    </Flex>
  );
}

export default App;
