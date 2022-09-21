import { Center, Container } from "@chakra-ui/react";
import InputForm from "./InputForm";

const Intro = (props) => {
  return (
    <Container className="intro">
      <p>
        Are you feeling old? Worried you're past your prime? Fret not, much
        older people than you have achieved great things! Enter your birthday to
        see what people older than you have accomplished!
      </p>
      <InputForm {...props} />
    </Container>
  );
};

export default Intro;
