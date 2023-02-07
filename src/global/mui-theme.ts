/** @module mui-theme
 *  @since 2023.02.07, 20:07
 *  @changed 2023.02.07, 20:07
 *  @see:
 *  - [Migrating to v5: getting started - Material UI](https://mui.com/material-ui/migration/migration-v4/)
 *  - [Theming - Material UI](https://mui.com/material-ui/customization/theming/)
 */

import { ThemeProvider, createTheme } from '@mui/material';

import generatedCssParams from './css-params-generated';

export const muiTheme = createTheme({
  // direction: 'rtl', // NOTE: Right to left direction. Rememeber to add `dir="rtl"` attribute to body tag.

  palette: {
    primary: generatedCssParams.primaryColors,

    // TODO:
    // - background
    // - text
    // - secondary
    // - error
  },

  // May be used in code:
  // - typography
  // - breakpoints
});

export { ThemeProvider };
