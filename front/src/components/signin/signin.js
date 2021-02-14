import React, { useEffect, useState } from 'react';
import useStyles from '../style'
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { login, logInByKey, loginChangeFn } from '../../redux/actions/loginAction';
import { connect, useDispatch } from 'react-redux';
import DrawerSignComponent from '../parts/DrawerSignComponent'
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

function Signin(props) {
   
  const { window } = props;
  const classes = useStyles();
  const {t} = useTranslation()
  const container = window !== undefined ? () => window().document.body : undefined;

  const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        for(let key in props.signin.err){
          props.signin.err && enqueueSnackbar(props.signin.err[key],  {variant:key} ) 
        }
    },[props.signin.err])
    console.log(props);
  return (
    <div className={classes.root}>
     
     <DrawerSignComponent data={container} history={props.history}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Grid container style={{marginTop:100}}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div className={classes.loginBox}>
                    <h1>{t('login')}</h1>
                    <TextField 
                      placeholder={t('login')}
                      value={props.signin.login}
                      label={!props.signin.errors.login?'':'Error'}
                      error={props.signin.errors.login?true:false}
                      helperText={!props.signin.errors.login?'':props.signin.errors.login}
                      onChange={(e)=>{props.dispatch(loginChangeFn('login', e.target.value))}}
                      style={{margin:10}}
                    />
                    <TextField 
                      
                      placeholder='Password'
                      value={props.signin.password}
                      label={!props.signin.errors.password?'':'Error'}
                      error={props.signin.errors.password?true:false}
                      helperText={!props.signin.errors.password?'':props.signin.errors.password}
                      onChange={(e)=>{props.dispatch(loginChangeFn('password', e.target.value))}}
                      style={{margin:10}}
                      onKeyPress={(e)=>props.dispatch(logInByKey(e.key,{login:props.signin.login, password:props.signin.password},props.history))}
                    />
                    <Button 
                    
                    onClick={()=>props.dispatch(login({login:props.signin.login, password:props.signin.password},props.history))}
                    style={{margin:10}} color="primary" variant='contained'>{t('login')}</Button>
                    
                  </div>
                </Paper>
              </Grid>
            </Grid>
      </main>
    </div>
  );
}

export default connect(r=>r)(Signin);
