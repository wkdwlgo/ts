import { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "./Router";
import { darktheme,lighttheme } from "./theme";
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from "react";

const GlobalStyle=createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Montserrat', sans-serif;
  background-color: ${(props)=>props.theme.textColor};
  color: ${(props)=>props.theme.textColor};
}
a {
  text-decoration: none;
  color: inherit;
}
`;

function App() {
	 const [isDark, setIsDark]= useState(false);
	 const toggleDark= ()=> setIsDark((current) => !current);
  return (
    <>
	  <ThemeProvider theme={isDark ? darktheme: lighttheme}>
	  
      <GlobalStyle/>
      <Router toggleDark={toggleDark} isDark={isDark}/>
	  <ReactQueryDevtools initialIsOpen={true}/>
	  </ThemeProvider>
    </>
   
  );
}

export default App;
