import { createGlobalStyle } from 'styled-components';
import 'reset-css';

const GlobalStyles = createGlobalStyle`
  
  body {
    background-color: ${(props) => props.theme.colors.green};
  }

`;

export default GlobalStyles;
