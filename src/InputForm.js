import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Button,
} from "@chakra-ui/react";

const InputForm = ({
  handleSubmit,
  handleChange,
  birthday,
  showErrorMessage,
  inputHeading,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <VStack align="center">
        <FormControl
          display="flex"
          flexDirection="column"
          alignItems="center"
          isInvalid={showErrorMessage}
        >
          <FormLabel fontSize="1.5rem" color="#F5FF8A" htmlFor="birthday">
            {inputHeading}
          </FormLabel>
          <Input
            textAlign="center"
            color="#ECFF17"
            fontSize="1.25rem"
            width="80%"
            onChange={handleChange}
            id="birthday"
            name="birthday"
            type="date"
            value={birthday}
          ></Input>
          <FormErrorMessage>
            Please enter a reasonable birthday
          </FormErrorMessage>
        </FormControl>
        <Button
          borderRadius="50px"
          fontSize="1.5rem"
          width="60%"
          backgroundColor="#F2FF5E"
          type="submit"
        >
          Inspire me!
        </Button>
      </VStack>
    </form>
  );
};

export default InputForm;
