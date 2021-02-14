import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from '../style'
import { connect } from 'react-redux';
import { loadData } from '../../redux/actions/profileAction';
import '../../App.css'
import { Grid, Paper } from '@material-ui/core';
import DrawerComponent from '../parts/DrawerComponent';
import { getAllPhotos, loadPhotos } from '../../redux/actions/photoAction';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Profile(props) {
  const { window } = props;
  const classes = useStyles();
  const {t} = useTranslation()
  const container = window !== undefined ? () => window().document.body : undefined;

useEffect(()=>{
  props.dispatch(loadPhotos())
  props.dispatch(getAllPhotos())
},[])

  return (
    <div className={classes.root}>
     <DrawerComponent data={container} history={props.history}/>
      <main className={classes.content}>
        <Grid container>
          <Grid item xs={12} style={{marginTop:70}}>
            <Paper className={classes.paper}>
               <div style={{backgroundImage:`url(http://localhost:5000/${props.profile.profileData.theme})`,backgroundSize: 'cover', width: '100%', height: 250, display:'flex', justifyContent:'center',alignItems:'flex-end'}}>
                <img src={`http://localhost:5000/${props.profile.profileData.photo}`} style={{width:100,height:100,borderTopLeftRadius:100,borderTopRightRadius:100}}/>
               </div>
            </Paper>
            <Grid container wrap={'nowrap'} style={{marginTop:20,marginBottom:20}}>
              <Grid item md={4}>
              <Paper className={classes.paper}>
                <Typography variant={'h5'}>{t('friends')}</Typography>
                <div className={classes.block}></div>
              </Paper>
            </Grid>
              
            <Grid item md={4}>
              <Paper className={classes.paper}>
                <div className={classes.profileBlock}>
                <Typography variant={'h5'}>{t('photos')}</Typography>
                 <Link to='photos'>
                 <div className={classes.block}>
                    {
                      props.profile.allPhotos.length>6?(
                        props.photo.photos.slice(0,6).map((item)=>{
                          return(
                            <Paper key={item.id} className={classes.paper}>
                              <div key={item.id} style={{margin:5}}>
                                <img width='50' height='30' src={`http://localhost:5000/${item.photo}`}  style={{objectFit:'cover'}}/>
                              </div>
                            </Paper>
                          )
                        })
                      ):(
                        props.profile.allPhotos.map((item)=>{
                          return(
                            <Paper key={item.id} className={classes.paper}>
                              <div key={item.id} style={{margin:5}}>
                                <img width='50' height='30' src={`http://localhost:5000/${item.photo}`}  style={{objectFit:'cover'}}/>
                              </div>
                            </Paper>
                          )
                        })
                      )
                     
                    }
                  </div>
                  </Link>
                </div>
              </Paper>
            </Grid>

            <Grid item md={4}>
              <Paper className={classes.paper}>
                <Typography variant={'h5'}>{t('portfolio')}</Typography>
                <div className={classes.block}></div>
              </Paper>
            </Grid>
               
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant={'h5'}>
                  {t('post')}
                </Typography>
              </Paper>
            </Grid>
            
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default connect(r=>r)(Profile);
