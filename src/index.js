import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './components/App';
import './styles/App.scss';
// import 'dom';

// // react-grid-layout
// import 'react-grid-layout/css/styles.css';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import 'react-resizable/css/styles.css';

// Material UI
import palette from './styles/theme/palette';
import shadows, { customShadows } from './styles/theme/shadows';
import typography from './styles/theme/typography';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { ApolloProvider } from '@apollo/client';
import client from './services/apollo/ApolloClient';

const theme = createTheme({
    palette,
    typography,
    shadows,
    customShadows,
});

const RootComponent = () => (
  <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </MuiThemeProvider>
);

ReactDOM.render(<RootComponent />, document.getElementById('root'));
