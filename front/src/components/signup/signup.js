import React from 'react';
import useStyles from '../style'
import { Grid, Paper } from '@material-ui/core';
import SignupSteps from '../parts/Signupsteps';
import DrawerSignComponent from '../parts/DrawerSignComponent'

function Signup(props) {
  const { window } = props;
  const classes = useStyles();
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
    <DrawerSignComponent data={container} history={props.history}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Grid container style={{marginTop:100}}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <SignupSteps data={props.history}/>
                </Paper>
              </Grid>
            </Grid>
      </main>
    </div>
  );
}

export default Signup;
