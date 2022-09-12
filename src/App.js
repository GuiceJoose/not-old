import "./App.css";
import Intro from "./Intro";
import Result from "./Result";
import { useState } from "react";
import intervalToDuration from "date-fns/intervalToDuration";

function App() {
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setAge(
      intervalToDuration({
        start: new Date(birthday),
        end: new Date(),
      }).years
    );
  };
  const handleChange = (e) => {
    setBirthday(e.target.value);
  };

  const getRandomNumberBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const generateStars = (numberOfStars) => {
    let stars = "";
    for (let i = 0; i < numberOfStars; i++) {
      stars += `${getRandomNumberBetween(-50, 50)}vw ${getRandomNumberBetween(
        -50,
        50
      )}vh ${getRandomNumberBetween(0, 2)}px ${getRandomNumberBetween(
        0,
        1
      )}px #fff,`;
    }
    return stars.substring(0, stars.length - 1);
  };

  return (
    <div className="App">
      <div
        className="background"
        style={{ boxShadow: generateStars(250) }}
      ></div>
      {isSubmitted ? (
        <Result birthday={birthday} age={age} />
      ) : (
        <Intro
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          birthday={birthday}
        />
      )}
    </div>
  );
}

export default App;
