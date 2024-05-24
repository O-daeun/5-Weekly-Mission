import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
      format('woff');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Pretendard';
  }

  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  li {
    list-style: none;
  }

  button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  /* img {
    display: block;
    width: 100%;
  } */

  address {
    font-style: normal;
  }

  :root {
    --Linkbrary-primary: #6d6afe;
    --Linkbrary-red: #ff5b56;
    --Linkbrary-black: #111322;
    --Linkbrary-white: #ffffff;
    --Linkbrary-bg: #f0f6ff;
    --Linkbrary-gray100: #3e3e43;
    --Linkbrary-gray60: #9fa6b2;
    --Linkbrary-gray20: #ccd5e3;
    --Linkbrary-gray10: #e7effb;
  }

  #root {
    position: relative;
    min-height: 100vh;
    padding-bottom: 160px;
  }
`;

export default GlobalStyle;
