import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
  typography: {
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontFamily: 'Noto Sans JP',

    h1: { fontSize: 32, fontWeight: 700 },
    h2: { fontSize: 24, fontWeight: 700 },
    h3: { fontSize: 20, fontWeight: 700 },
    h4: { fontSize: 0 }, // 使用しない
    h5: { fontSize: 0 }, // 使用しない
    h6: { fontSize: 0 }, // 使用しない
    subtitle1: { fontSize: 16, fontWeight: 500 },
    subtitle2: { fontSize: 0 },
    body1: { fontSize: 16 },
    body2: { fontSize: 12 },
    // ボタンのアルファベット大文字化を無効にする
    button: { textTransform: 'none' },
  },
  palette: {
    primary: {
      main: '#6D9B00',
      contrastText: '#fff',
      light: '#E3F4C1',
      dark: '#51661E',
    },
    secondary: {
      main: '#88501A',
      contrastText: '#fff',
      light: '#FDF1DB',
    },
  },
});

export const appColors = {
  primaryAccent: '#C6F075',
  bgGray: '#f0f0f0',
  textGray: '#888888',
};
