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
        <Grid item xs={false} sm={2}/>
        <Grid item xs={12} sm={8}>
          <QuestionsFeed />
        </Grid>
        <Grid item xs={false} sm={2}/>
      </Grid>
    </Grid>
  );
}

export default App;
