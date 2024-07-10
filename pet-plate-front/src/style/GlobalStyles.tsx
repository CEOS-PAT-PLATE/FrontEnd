import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'SUIT';
  src: url('https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT-Regular.woff2') format('woff2');
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'SUIT Variable';
  src: url('https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.woff2') format('woff2');
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

  ${reset}

  html,
  body {
    /* width:100%;
    height: 100vh; */
    width: 360px;
    height: 800px;
    margin: 0 auto;
    font-family: 'SUIT', sans-serif;
  }


* {
  box-sizing: border-box;
}



button{
  cursor: pointer;
  padding: 0;
}

h2{
  font-size: 1rem;
  font-weight: 400;
}

h1{
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 160%;
}
  
::-webkit-scrollbar {
  width: 0px;
    height: 0px;

}
  
`;

export default GlobalStyles;
