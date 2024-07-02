import { createGlobalStyle } from 'styled-components';
import 'reset-css';

const GlobalStyles = createGlobalStyle`
  
  body {
    background-color: ${(props) => props.theme.colors['green-900']}; //theme 사용 문법 예시 
  }

`;

export default GlobalStyles;
