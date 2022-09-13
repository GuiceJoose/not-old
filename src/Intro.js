const Intro = (props) => {
  const handleSubmit = props.handleSubmit;
  const handleChange = props.handleChange;
  const birthday = props.birthday;
  const showErrorMessage = props.showErrorMessage;

  return (
    <div className="intro">
      <p>
        Are you feeling old? Worried you're past your prime? Fret not, much
        older people than you have achieved great things! Enter your birthday to
        see what people older than you have accomplished!
      </p>
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
        {showErrorMessage ? <div>Please enter a real birthday</div> : ""}
      </form>
    </div>
  );
};

export default Intro;
