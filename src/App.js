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

  return (
    <div className="App">
      <header className="App-header">Dis da header</header>
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
