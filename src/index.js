import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./App.css";
import "@fontsource/bebas-neue";

const theme = extendTheme({
  fonts: {
    heading: `"Bebas Neue", sans serif`,

    body: `"Bebas Neue", sans serif`,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
