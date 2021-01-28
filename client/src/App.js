import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Header from './components/Header';
import QuestionsFeed from './components/QuestionsFeed';
import theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Grid container direction='column'>
            <Grid item>
              <Header />
            </Grid>
          <Grid item container>
            <Grid item xs={false} sm={2}/>
            <Grid item xs={12} sm={8}>
              <Switch>
                <Route exact path='/' component={QuestionsFeed}/>
                <Route exact path='/newpost' component={() => <div>NEW POST GOES HERE</div>}/>
                <Route exact path='/signup' component={() => <div>SIGN UP PAGE GOES HERE</div>}/>
                <Route exact path='/login' component={() => <div>LOGIN PAGE GOES HERE</div>}/>
              </Switch>
            </Grid>
            <Grid item xs={false} sm={2}/>
          </Grid>
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
