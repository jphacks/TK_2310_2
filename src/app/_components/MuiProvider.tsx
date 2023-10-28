'use client';

import { mainTheme } from '@/themes/main';
import { ThemeProvider } from '@mui/material/styles';
// import { ThemeProvider } from "@emotion/react";

import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const MuiProvider = ({ children }: Props) => {
  return <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>;
};

export default MuiProvider;
