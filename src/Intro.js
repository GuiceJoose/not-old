import { Container, Text, Heading, Box } from "@chakra-ui/react";
import InputForm from "./InputForm";

const Intro = (props) => {
  return (
    <Container maxWidth="1000px" centerContent>
      <Heading
        textAlign="center"
        fontSize={{ base: "4rem", md: "6rem" }}
        color="#ECFF17"
      >
        Do you feel old?
      </Heading>
      <Text
        maxWidth="50%"
        align="center"
        fontSize={{ base: "1rem", md: "1.5rem" }}
        color="#9DA33F"
      >
        Worried you're past your prime? Fret not, much older people than you
        have achieved great things!
      </Text>
      <Box>
        <InputForm
          {...props}
          inputHeading="Enter your birthday to be inspired"
        />
      </Box>
    </Container>
  );
};

export default Intro;
