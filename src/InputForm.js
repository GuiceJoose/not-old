const InputForm = (props) => {
  const handleSubmit = props.handleSubmit;
  const handleChange = props.handleChange;
  const birthday = props.birthday;
  const showErrorMessage = props.showErrorMessage;

  return (
    <form className="intro-form" onSubmit={handleSubmit}>
      <label htmlFor="birthday">Your Birthday:</label>
      <input
        onChange={handleChange}
        id="birthday"
        name="birthday"
        type="date"
        value={birthday}
      ></input>
      <button type="submit">Inspire me!</button>
      {showErrorMessage ? <div>Please enter a reasonable birthday</div> : ""}
    </form>
  );
};

export default InputForm;
