import { createGlobalStyle } from 'styled-components'
import 'reset-css'

const GlobalStyles = createGlobalStyle`

/* Variable 폰트 스타일링 */
  @import url('https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css');

  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color:${(props) => props.theme.colors['green']}; // 전체 배경색 설정
  }

  body {
    background-color: ${(props) => props.theme.colors['grey1']}; // body 배경색 설정
    width: 360px;
    height: 753px;
    margin: auto;
    position: relative;

    
    font-family: 'SUIT Variable', sans-serif; /* Variable 폰트를 기본으로 설정 */

    /* font-family: 'SUIT', sans-serif; */
  }
  }
`

export default GlobalStyles
