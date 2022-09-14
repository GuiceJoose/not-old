import { useEffect, useState } from "react";
import InputForm from "./InputForm";

const Result = (props) => {
  const message = props.message;
  const person = props.person;
  const [wikiImgUrl, setWikiImgUrl] = useState("");
  const [wikiImgName, setWikiImgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const spaceToUnderscores = (string) => {
    return string.split(" ").join("_");
  };

  const wikiTitle = spaceToUnderscores(person.name);

  // There doesn't appear to be a way to get the main image on a wikipedia page,
  // so the first API call gets the file name of the image used as the thumbnail,
  // then the second gets the source for that image.

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

  useEffect(() => {
    getWikiImageName().then((data) =>
      setWikiImgName(
        `File:${data.query.pages[Object.keys(data.query.pages)[0]].pageimage}`
      )
    );
  }, [person]);

  useEffect(() => {
    if (wikiImgName !== "") {
      getWikiImageUrl().then((data) =>
        setWikiImgUrl(
          data.query.pages[Object.keys(data.query.pages)[0]].imageinfo[0].url
        )
      );
    }
  }, [wikiImgName]);

  useEffect(() => {
    setIsLoading(false);
  }, [wikiImgUrl]);

  return (
    <div className="result">
      <div className="result-box">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="image-container">
            <img src={wikiImgUrl} />
            <a
              target={"_blank"}
              href={`https://en.wikipedia.org/wiki/${wikiTitle}`}
            >
              Wiki Page
            </a>
          </div>
        )}

        {message}
      </div>
      <section className="input-area">
        Try again:
        <InputForm {...props} />
      </section>
    </div>
  );
};

export default Result;
