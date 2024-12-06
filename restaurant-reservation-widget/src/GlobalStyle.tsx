import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
  }

  h1 {
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;