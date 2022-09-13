import "./App.css";
import Intro from "./Intro";
import Result from "./Result";
import Background from "./Background";
import { useState } from "react";
import intervalToDuration from "date-fns/intervalToDuration";
import { isBefore } from "date-fns";

function App() {
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBirthdayValid, setIsBirthdayValid] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    }

    setAge(age);
    setIsSubmitted(true);
  };
  const handleChange = (e) => {
    setBirthday(e.target.value);
  };

  return (
    <div className="App">
      <Background />
      {isSubmitted && isBirthdayValid ? (
        <Result birthday={birthday} age={age} />
      ) : (
        <Intro
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          birthday={birthday}
          showErrorMessage={showErrorMessage}
        />
      )}
    </div>
  );
}

export default App;
