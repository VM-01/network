import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useStyles from '../style'
import HomeIcon from '@material-ui/icons/Home';
import { Divider, List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import EmailIcon from '@material-ui/icons/Email';
import GroupIcon from '@material-ui/icons/Group';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import RadioIcon from '@material-ui/icons/Radio';
import DescriptionIcon from '@material-ui/icons/Description';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { getAllPhotos } from '../../redux/actions/photoAction';
import { useTranslation } from 'react-i18next';
function Sidebar(props) {
  const {t, i18n} = useTranslation()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

    const classes = useStyles();
    const drawer = (
      <div>
        <div className={classes.toolbar} style={{backgroundImage:`url(http://localhost:5000/${props.data.theme})`,backgroundSize:'cover'}}>
            <div className={classes.toolbar} style={{marginBottom:10,marginTop:10,background: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 10}}>
            <img src={`http://localhost:5000/${props.data.photo}`} style={{width:60,objectFit:'cover',border:'1px double black', borderRadius:100}}/>
            <h1 style={{color:'white', margin:0}}>{props.data.name} {props.data.surname}</h1>
            </div>
        </div>
        <Divider />
        <List>
            <Link style={{color:'#8a8484'}} to='/profile'><ListItem button><HomeIcon style={{marginRight:10, color:'#8a8484'}}/>{t('profile')}</ListItem></Link>
            <Link style={{color:'#8a8484'}} to='/news'><ListItem button><RadioIcon style={{marginRight:10, color:'#8a8484'}}/>{t('news')}</ListItem></Link>
            <Link style={{color:'#8a8484'}} to='/photos'> <ListItem button><PhotoLibraryIcon style={{marginRight:10, color:'#8a8484'}}/>{t('photos')}</ListItem></Link>
            <Link style={{color:'#8a8484'}} to='/messages'> <ListItem button><EmailIcon style={{marginRight:10, color:'#8a8484'}}/>{t('messages')}</ListItem></Link>
            <Link style={{color:'#8a8484'}} to='/friends'> <ListItem button><GroupIcon style={{marginRight:10, color:'#8a8484'}}/>{t('friends')}</ListItem></Link>
            <Link style={{color:'#8a8484'}} to='/requests'> <ListItem button><NotificationsIcon style={{marginRight:10, color:'#8a8484'}}/>{t('requests')}</ListItem></Link>
            <Link style={{color:'#8a8484'}} to='/cv'> <ListItem button><DescriptionIcon style={{marginRight:10, color:'#8a8484'}}/>{t('cv')}</ListItem></Link>
            <Link style={{color:'#8a8484'}} to='/portfolio'> <ListItem button><BusinessCenterIcon style={{marginRight:10, color:'#8a8484'}}/>{t('portfolio')}</ListItem></Link>
            <Link style={{color:'#8a8484'}} to='/settings'> <ListItem button><SettingsIcon style={{marginRight:10, color:'#8a8484'}}/>{t('settings')}</ListItem></Link>
        </List>
        <Divider />
        <button onClick={()=>changeLanguage('ru')}>ru</button>
        <button onClick={()=>changeLanguage('en')}>en</button>
        <button onClick={()=>changeLanguage('am')}>am</button>
      </div>
    );
    return <>{drawer}</>
}

export default Sidebar