import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#E2645A'
    },
    secondary: {
      main: '#86D0CB'
    },
    text: {
      primary: '#585858',
      secondary: '#9B9A9A'
    }
  },
  shadows,
  typography
});

export default theme;
