// src/styles.js
import { css } from 'styled-components';

export const colors = {
    black: "#000000",
    white: "#FFFFFF",
    cyan: "#40babd",
    skyblue: "#58bbee",
    darkgray: "#323232", 
    midgray: "#888888",
    gray: "#bbbbbb",
    highlightgray:'#dddddd',
    lightgray:'#f0f0f0',
  };
  
  export const fonts = {
    header: "Open Sans",
    content: "Roboto"
  };
  
  export const fontSize = {
    h1: "2.5rem",  
    h2: "2rem",     
    h3: "1.75rem",  
    h4: "1.5rem",   
    h5: "1.25rem",  
    h6: "1rem",    
    large: "1.5rem",   
    medium: "1.25rem", 
    small: "1rem"   
  };
  
  export const media = {
    mobile: (styles) => css`
      @media (max-width: 768px) {
        ${styles}
      }
    `
  };