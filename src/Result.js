import { useEffect, useState } from "react";
import InputForm from "./InputForm";
import {
  Spinner,
  Link,
  Image,
  Box,
  Container,
  Stack,
  Heading,
} from "@chakra-ui/react";

const Result = (props) => {
  const message = props.message;
  const person = props.person;
  const [wikiImgUrl, setWikiImgUrl] = useState("");
  const [wikiImgName, setWikiImgName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const spaceToUnderscores = (string) => {
    return string.split(" ").join("_");
  };

  const wikiTitle = spaceToUnderscores(person.name);

  // There doesn't appear to be a way to get the main image on a wikipedia page,
  // so the first API call gets the file name of the image used as the thumbnail,
  // then the second API call gets the source for that image.

  const getWikiImageName = async () => {
    setIsLoading(true);
    let response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${wikiTitle}&prop=pageimages&format=json&origin=*`
    );
    return response.json();
  };

  const getWikiImageUrl = async () => {
    let response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${wikiImgName}&prop=imageinfo&iiprop=url&format=json&origin=*`
    );
    return response.json();
  };

  // Get thumbnail image filename from person's wiki page

  useEffect(() => {
    (async () => {
      const wikiImageName = await getWikiImageName();
      setWikiImgName(
        `File:${
          wikiImageName.query.pages[Object.keys(wikiImageName.query.pages)[0]]
            .pageimage
        }`
      );
    })();
  }, [person]);

  // Get image url for filename above

  useEffect(() => {
    if (wikiImgName !== "") {
      (async () => {
        const wikiImageUrl = await getWikiImageUrl();
        setWikiImgUrl(
          wikiImageUrl.query.pages[Object.keys(wikiImageUrl.query.pages)[0]]
            .imageinfo[0].url
        );
      })();
    }
  }, [wikiImgName]);

  return (
    <Stack spacing={"10vh"}>
      (
      <Container maxWidth="1000px">
        <Spinner
          boxSize="100px"
          thickness="10px"
          color="yellow"
          display={isLoading ? "block" : "none"}
        />
        <Container textAlign="center" display={isLoading ? "none" : "block"}>
          {message !==
            "Okay, maybe you are old. Perhaps it's time to kick back and relax" && (
            <Image
              marginTop=".5rem"
              onLoad={() => {
                console.log("loaded");
                setIsLoading(false);
              }}
              src={wikiImgUrl}
              alt={person.name}
            />
          )}

          <Heading textAlign="center" color="#ECFF17">
            {message}
          </Heading>
          {message !==
            "Okay, maybe you are old. Perhaps it's time to kick back and relax" && (
            <Link
              color="#9DA33F"
              rel="noreferrer"
              target={"_blank"}
              href={`https://en.wikipedia.org/wiki/${wikiTitle}`}
            >
              Click here to learn more about {person.name}
            </Link>
          )}
        </Container>
      </Container>
      )
      <Box
        display={isLoading && "none"}
        // position="absolute"
        // left="50vw"
        // bottom="20vh"
        // transform="translate(-50%, -50%)"
      >
        <InputForm
          {...props}
          inputHeading={"Need more inspiration? Try again:"}
        />
      </Box>
    </Stack>
  );
};

export default Result;
