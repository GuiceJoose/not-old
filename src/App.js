import "./App.css";
import Background from "./Background";
import Intro from "./Intro";
import Result from "./Result";
import { useState } from "react";
import intervalToDuration from "date-fns/intervalToDuration";
import { isBefore, set } from "date-fns";
import { Box, Button, Flex } from "@chakra-ui/react";

function App() {
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBirthdayValid, setIsBirthdayValid] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [backgroundPaused, setBackgroundPaused] = useState(false);

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
    <Box display="flex" flexDir="column" justifyContent="center" minH={"100vh"}>
      <Background backgroundPaused={backgroundPaused} key={backgroundPaused} />
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginBottom="var(--chakra-sizes-10)"
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
      <Button
        _hover={{
          backgroundColor: "rgb(0,0,0,100%)",
          border: "3px solid #ECFF17",
        }}
        fontSize="1.5rem"
        color="#ECFF17"
        backgroundColor="rgb(0,0,0,100%)"
        position="absolute"
        bottom="0"
        left="50%"
        transform="translate(-50%, 0%)"
        onClick={() => {
          setBackgroundPaused(!backgroundPaused);
        }}
      >
        {backgroundPaused
          ? "Start the fun space animation back up!"
          : "I'm dizzy stop this thing!"}
      </Button>
    </Box>
  );
}

export default App;
