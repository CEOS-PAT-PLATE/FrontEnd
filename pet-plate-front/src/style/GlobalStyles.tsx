import { createGlobalStyle } from 'styled-components'
import 'reset-css'

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
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color:${(props) => props.theme.colors['green']}; // 전체 배경색 설정
  }

  body {
  font-family: 'SUIT', sans-serif;
    background-color: ${(props) => props.theme.colors['grey1']}; // body 배경색 설정
    width: 360px;
    height: 756px;
    margin: auto;
    padding-top:44px;
    position: relative;

    
    font-family: 'SUIT Variable', sans-serif; /* Variable 폰트를 기본으로 설정 */

    /* font-family: 'SUIT', sans-serif; */
  }
  }
`

export default GlobalStyles
