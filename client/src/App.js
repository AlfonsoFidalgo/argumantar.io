import React from 'react';
import Header from './components/Header';
import QuestionsFeed from './components/QuestionsFeed';
import { Grid } from '@material-ui/core';

function App() {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Header />
      </Grid>
      
      <Grid item container>
        <Grid item xs={0} sm={3}/>
        <Grid item xs={12} sm={6}>
        QUESTIONS FEED
        </Grid>
        <Grid item xs={0} sm={3}/>
      </Grid>
    </Grid>
  );
}

export default App;
