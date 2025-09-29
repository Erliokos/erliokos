/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
  color: blue;
  text-decoration: underline !important;
  transition: color 0.2s;
  }

  a:hover {
  color: darkblue;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.secondary[900]};
    background-color: ${({ theme }) => theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    border: none;
    outline: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;


export const Icon = styled.svg`
  fill: ${({ theme }) => theme.colors.primary[900]};
  height: 30px;
  width: 30px;

  &:hover {
    fill: ${({ theme }) => theme.colors.primary[500]};
  }
`


export const media = {
  sm: (styles: any) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      ${styles}
    }
  `,
  md: (styles: any) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      ${styles}
    }
  `,
  lg: (styles: any) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      ${styles}
    }
  `,
  xl: (styles: any) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      ${styles}
    }
  `,
}
