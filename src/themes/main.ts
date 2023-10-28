import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
  typography: {
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontFamily: 'Noto Sans JP',

    h1: { fontSize: 30 },
    h2: { fontSize: 26 },
    h3: { fontSize: 22 },
    h4: { fontSize: 20 },
    h5: { fontSize: 18 },
    h6: { fontSize: 16 },
    subtitle1: { fontSize: 18 },
    subtitle2: { fontSize: 14 },
    body1: { fontSize: 16 },
    body2: { fontSize: 12 },
    // ボタンのアルファベット大文字化を無効にする
    button: { textTransform: 'none' },
  },
  palette: {
    primary: {
      main: '#00b8c8',
      contrastText: '#fff',
      light: '#e1f1f3',
    },
  },
});
