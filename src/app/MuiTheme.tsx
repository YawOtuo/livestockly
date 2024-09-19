"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
const theme = createTheme({
  palette: {
    primary: {
      main: "#0fa958",
    },
  },
});

export default function MuiTheme({ children } : {children :React.ReactNode}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
