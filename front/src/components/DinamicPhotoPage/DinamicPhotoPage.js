import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from '../style'
import { connect } from 'react-redux';
import '../../App.css'
import { Breadcrumbs, Grid, IconButton, Paper } from '@material-ui/core';
import DrawerComponent from '../parts/DrawerComponent';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import FolderIcon from '@material-ui/icons/Folder';
import { closeSlider, createFolder, decr, deletePhotoFromFolder, droppedImage, dropToFolder, getDroppedItem, incr, loadFolders, loadPhotos, openSlider, updatePhotosInFolders, uploadPhoto, uploadPhotoInFolderDialog } from '../../redux/actions/photoAction';
import FolderModal from '../modals/FolderModal/FolderModal';
import UploadImageModal from '../modals/UploadImage/UploadImageModal';
import { Link, useParams } from 'react-router-dom'
import UploadPhotoInFolder from '../modals/UplooadPhotoInFolder/UploadPhotoInFolder';
import { useTranslation } from 'react-i18next';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { Divider } from '@material-ui/core';
import { Suspense } from 'react';


function DinamicPhotoPage(props) {
  const { window } = props;
  const classes = useStyles();
let {id} = useParams() 
   const container = window !== undefined ? () => window().document.body : undefined;
    const {t} = useTranslation() 
useEffect(()=>{
  props.dispatch(loadFolders())
  props.dispatch(loadPhotos())
  props.dispatch(updatePhotosInFolders(id))
},[])
let bread = props.photo.folders.find(item=>item.id==id)
let slide = props.photo.slideOpen==false?{display:'none'}:{display:'block'}

   return (
    <div className={classes.root}>
      
    
       <div className={classes.sliderBg} style={slide}>
                <div className={classes.slideActions}>
                  <IconButton onClick={()=>props.dispatch(decr())}>
                    <ArrowBackIosIcon style={{color:'white',width:50,height:50}}/>
                  </IconButton>
                  <div className={classes.slider}>
                    <div className={classes.slidePhoto}>
                      <img src={props.photo.slideOpen==true?`http://localhost:5000/${props.photo.slideArr[props.photo.slideNum].photo}`:''} className={classes.sImg}/>
                    </div>
                    <div className={classes.slideInfo}>
                        <div>
                          <h3>{props.photo.slideOpen==true?props.photo.slideArr[props.photo.slideNum].name:'Photo name'}</h3>
                          <Divider/>
                          <IconButton>
                            <ThumbUpAltIcon/>
                          </IconButton>
                          <Divider/>
                          <h4>
                            comments
                          </h4>
                        </div>
                    </div>
                    </div>
                  <IconButton onClick={()=>props.dispatch(incr())}>
                    <ArrowForwardIosIcon style={{color:'white',width:50,height:50}}/>
                  </IconButton>
                </div>
                <IconButton onClick={()=>props.dispatch(closeSlider())} style={{position:'absolute', right:10,top:70}}>
                  <CloseIcon style={{color:'white',width:50,height:50}}/>
                </IconButton>         
        </div>


     <DrawerComponent data={container} history={props.history}/>
      <main className={classes.content}>
        <Grid container style={{marginTop:40}}>
          <Grid item xs={12}>
              <IconButton onClick={()=>props.dispatch(uploadPhotoInFolderDialog())}>
                <AddPhotoAlternateIcon/>
                <Typography>{t('upload')}</Typography>
              </IconButton>
          
              <UploadPhotoInFolder/>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="/photos">
                  Photos
                </Link>
                <Typography color="textPrimary">{bread && bread.name}</Typography>
              </Breadcrumbs>
              {/* <span>{t('photos')} {props.photo.photosInFolder.length}</span> */}
            <Paper className={classes.photoPaper}>
            
              {
                props.photo.photosInFolder.length==0?(
                  <Typography>{t('noPhoto')}</Typography>
                ):(
                  props.photo.photosInFolder.map((item,index)=>{
                    return(
                      <div className={classes.folder} key={item.id} >

                        <span 
                        onClick={()=>{props.dispatch(deletePhotoFromFolder(item,index,id))}}
                        className='delIcon'>&times;</span>

                        <img 
                        onClick={()=>props.dispatch(openSlider(index,props.photo.photosInFolder))}
                        draggable={false} 
                        src={item.photo.includes('blob')?item.photo:`http://localhost:5000/${item.photo}`} 
                        width='50' 
                        height='38' 
                        style={{margin:10, objectFit:'contain', width:'100%',height:'100%'}}/>
                        
                       
                      </div>
                      
                    )
                  })
                )
                
              }
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default connect(r=>r)(DinamicPhotoPage);
