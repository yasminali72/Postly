'use client';
import { Roboto_Serif } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto_Serif({
  weight: [ '400', '100', '900'],
  subsets: ['latin'],
  
});

const theme = createTheme({
  typography: {
fontFamily:roboto.style.fontFamily 
 },
});

export default theme;
