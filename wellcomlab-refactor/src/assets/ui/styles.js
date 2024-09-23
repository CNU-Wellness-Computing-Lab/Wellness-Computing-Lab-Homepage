// src/styles.js
import { css } from 'styled-components';

export const colors = {
    black: "#000000",
    white: "#FFFFFF",
    gray900: "#323232",        // 가장 어두운 회색
    gray700: "#777777",        // 중간 회색
    gray500: "#bbbbbb",        // 밝은 회색
    gray300: "#dddddd",        // 강조 회색
    gray100: "#f0f0f0",        // 매우 밝은 회색
    gray50: "#F5F5F5",         // 흰색에 가까운 색
    cyan: "#40babd",
    lightCyan: "#BAE2E3",
    skyblue: "#58bbee",
    darkgray: "#323232", 
    midgray: "#777777",
    gray: "#bbbbbb",
    highlightgray:'#dddddd',
    lowdarkMainColor: '#5CA664',
    lightgray:'#f0f0f0',
    mainColor: '#56CB5F',
    mainColorRGB: '86, 203, 95',
  };
  
  export const fonts = {
    header: "Open Sans",
    content: "Roboto",
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
    `,
    gridSize: (styles) => css`
    @media (max-width: 825px) {
      ${styles}
    }
    `
  };