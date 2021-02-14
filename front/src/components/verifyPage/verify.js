import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { submit, verifyChangeFn } from '../../redux/actions/verifyAction';
import DrawerSignComponent from '../parts/DrawerSignComponent';
import useStyles from '../style'

function VerifyPage (props){
    const { window } = props;
    const classes = useStyles();
    const container = window !== undefined ? () => window().document.body : undefined;
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        for(let key in props.verify.err){
          props.verify.err && enqueueSnackbar(props.verify.err[key],  {variant:key} ) 
        }
    },[props.verify.err])

    return(
    <div className={classes.root}>
    <DrawerSignComponent data={container} history={props.history}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Grid container style={{marginTop:100}}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <div style={{display:'grid'}}>

                        <Typography variant={'h4'}>Verification</Typography>

                        <TextField
                        value={props.verify.login}
                        onChange={(e)=>props.dispatch(verifyChangeFn('login', e.target.value))} 
                        placeholder='Your mail'/>

                        <TextField
                        value={props.verify.verifyCode}
                        onChange={(e)=>props.dispatch(verifyChangeFn('verifyCode', e.target.value))} 
                        placeholder='Verification code' style={{marginTop:20,marginBottom:20}}/>

                        <Button 
                        onClick={()=>props.dispatch(submit(props.verify.login, props.verify.verifyCode,props.history))} 
                        variant="contained" 
                        color="primary">Submit</Button>

                    </div>
                </Paper>
              </Grid>
            </Grid>
      </main>
    </div>
    )

}

export default  connect(r=>r)(VerifyPage)