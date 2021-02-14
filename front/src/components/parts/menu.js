import { Divider, List, ListItem } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import useStyles from '../style'
import { useTranslation } from 'react-i18next';




  export default function Menu(){
    const classes = useStyles();
    const [t, i18n] = useTranslation();

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
            <Link style={{color:'#8a8484'}} to='/'><ListItem button><LockOpenIcon/>{t('login')}</ListItem></Link>
            <Link style={{color:'#8a8484'}} to='/signup'> <ListItem button><LockOpenIcon/>{t('signUp')}</ListItem></Link>
        </List>
      </div>
    );

    return <>{drawer}</>
  }