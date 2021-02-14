import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import {connect} from 'react-redux'
import { backStep, infoChangeFn, mailChangeFn, nextStep, resetStep } from '../../redux/actions/signAction';
 import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));



function SignupSteps(props) {
  const classes = useStyles();
   const {t} = useTranslation()
    let steps = props.signup.registerSteps.stepCount
    let activeStep = props.signup.registerSteps.steps
    let error = props.signup.errors
    function getStepContent(stepIndex) {
     
        switch (stepIndex) {
          case 0:
            return (
                <TextField 
                onChange={(e)=>props.dispatch(mailChangeFn('login',e.target.value))}
                label={!error.login?'':'Error'}
                error={!error.login?false:true}
                helperText={!error.login?'':error.login}
                value={props.signup.login}
                placeholder={t('mail')} />
            );
          case 1:
            return (
              <>
                <TextField
                 style={{margin:10}}
                 value={props.signup.name}
                 label={!error.info?'':'Error'}
                 error={!error.info?false:true}
                 helperText={!error.info?'':error.info}
                 placeholder={t('name')}
                 onChange={(e)=>props.dispatch(infoChangeFn('name',e.target.value))}
                />
                 <TextField
                 style={{margin:10}}
                 value={props.signup.surname}
                 label={!error.info?'':'Error'}
                 error={!error.info?false:true}
                 helperText={!error.info?'':error.info}
                 placeholder={t('surname')}
                 onChange={(e)=>props.dispatch(infoChangeFn('surname',e.target.value))}
                />
                
              </>
            );
          case 2:
            return (
              <>
                <TextField
                 style={{margin:10}}
                 value={props.signup.password}
                 label={!props.signup.errors.password?'':'Error'}
                 error={!error.password?false:true}
                 helperText={!error.password?'':error.password}
                 placeholder={t('pass')}
                 type='password'
                 onChange={(e)=>props.dispatch(infoChangeFn('password',e.target.value))}
                />
                {!error.password}
                 <TextField
                 style={{margin:10}}
                 value={props.signup.repassword}
                 label={!error.password?'':'Error'}
                 error={!error.password?false:true}
                 helperText={!error.password?'':error.password}
                 placeholder={t('repeat')}
                 type='password'
                 onChange={(e)=>props.dispatch(infoChangeFn('repassword',e.target.value))}
                />
              </>
            );
          default:
            return 'Unknown stepIndex';
        }
      }
       
  return (
    <div className={classes.root}>
      <h1>{t('signUp')}</h1>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {
            activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>{t('complete')}</Typography>
                <Button onClick={()=>props.dispatch(resetStep())}>{t('reset')}</Button>
              </div>
            ) : (
                <div className={classes.instructions}>
                    <div className={classes.instructions}>
                    {getStepContent(activeStep)}
                    </div>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={()=>props.dispatch(backStep())}
                    className={classes.backButton}
                  >
                    {t('back')}
                  </Button>
                  <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={()=>props.dispatch(nextStep(props.signup.login,activeStep,{name:props.signup.name,surname:props.signup.surname},{password:props.signup.password,repassword:props.signup.repassword},props.data))}>
                    {activeStep === steps.length - 1 ? t('finish') : t('next')}
                  </Button>
                </div>
              </div>
            )
        }
      </div>
    </div>
  );
}

export default connect(r=>r)(SignupSteps)
