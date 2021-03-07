import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Header from './components/Header';
import QuestionsFeed from './components/QuestionsFeed';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Post from './components/Post';
import NewPost from './components/NewPost';
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
            <Grid item xs={false} sm={1} md={2}/>
            <Grid item xs={12} sm={10} md={8}>
              <Switch>
                <Route exact path='/' component={QuestionsFeed}/>
                <Route exact path='/newpost' component={NewPost}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/logout' component={Logout}/>
                <Route exact path='/signup' component={Signup}/>
                <Route path='/post/:id' component={Post}/>
              </Switch>
            </Grid>
            <Grid item xs={false} sm={1} md={2}/>
          </Grid>
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
