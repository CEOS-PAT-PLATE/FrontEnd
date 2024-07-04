import { createGlobalStyle } from 'styled-components'
import 'reset-css'

const GlobalStyles = createGlobalStyle`
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
  }
`

export default GlobalStyles
