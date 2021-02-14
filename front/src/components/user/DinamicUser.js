import { Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../redux/actions/userAction';
import DrawerComponent from '../parts/DrawerComponent';
import useStyles from '../style'
function DinamicUser(props) {
   
        const { window } = props;
        const classes = useStyles();
        const container = window !== undefined ? () => window().document.body : undefined;
        const {t} = useTranslation()
        const {id} = useParams()

        useEffect(()=>{
            props.dispatch(getUser(id))
        },[id])
console.log(props);
        return(
            <div className={classes.root}>
           <DrawerComponent data={container} history={props.history}/>
            <main className={classes.content}>
              
            <Grid container>
          <Grid item xs={12} style={{marginTop:70}}>
            <Paper className={classes.paper}>
               <div style={{backgroundImage:props.user.user && `url(http://localhost:5000/${props.user.user.photo})`,backgroundSize: 'cover', width: '100%', height: 250, display:'flex', justifyContent:'center',alignItems:'flex-end'}}>
                <img src={props.user.user && `http://localhost:5000/${props.user.user.photo}`} style={{width:100,height:100,borderTopLeftRadius:100,borderTopRightRadius:100}}/>
                <Typography variant={'caption'}>{props.user.user && props.user.user.name}</Typography>
               </div>
            </Paper>
            {/* <Grid container wrap={'nowrap'} style={{marginTop:20,marginBottom:20}}>
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
             */}
          </Grid>
        </Grid>


            </main>
          </div>
    );
}

export default connect(r=>r)(DinamicUser);