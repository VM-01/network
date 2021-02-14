import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from '../style'
import { connect } from 'react-redux';
import '../../App.css'
import { Button, Grid, IconButton, Paper } from '@material-ui/core';
import DrawerComponent from '../parts/DrawerComponent';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import FolderIcon from '@material-ui/icons/Folder';
import { createFolder, droppedImage, dropToFolder, getDroppedItem, goToFolder, loadFolders, loadPhotos, uploadPhoto, deletePhotoFromRoot, deleteFolder, getAllPhotos, openSlider, decr, incr, closeSlider } from '../../redux/actions/photoAction';
import FolderModal from '../modals/FolderModal/FolderModal';
import UploadImageModal from '../modals/UploadImage/UploadImageModal';
import { useTranslation } from 'react-i18next';
 
 import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
 import { Divider } from '@material-ui/core';

 import logo from '../../album.jpg'
function Photos(props) {
  const { window } = props;
  const classes = useStyles();
  const container = window !== undefined ? () => window().document.body : undefined;
  const {t} = useTranslation()

useEffect(()=>{
  props.dispatch(loadFolders())
  props.dispatch(loadPhotos())
  props.dispatch(getAllPhotos())
},[])
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
              <IconButton onClick={()=>props.dispatch(createFolder())}>
                <CreateNewFolderIcon/>
                <Typography>{t('createF')}</Typography>
              </IconButton>
              <FolderModal/>
              <IconButton onClick={()=>props.dispatch(uploadPhoto())}>
                <AddPhotoAlternateIcon/>
                <Typography>{t('upload')}</Typography>
              </IconButton>
              <UploadImageModal/>
              {/* <span style={{margin:20}}>{t('folders')} {props.photo.folders.length}</span>
              <span>{t('photos')} {props.photo.photos.length + props.profile.allPhotos.length}</span> */}
            <Paper className={classes.photoPaper} style={props.photo.folders.length>6?{justifyContent:'center'}:{justifyContent:'flex-start'}}>
              
              {
            props.photo.folders.length>9?( props.photo.folders.slice(0,9).map((item,index)=>{
                  return(
                    <div className={classes.folder} key={item.id} 
                    style={{backgroundImage:`url(${logo})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}
                    onDoubleClick={()=>props.dispatch(goToFolder(props.history,item.id))}
                     onDragOver={(e)=>e.preventDefault()}
                    onDrop={(e)=>props.dispatch(getDroppedItem(e,item.id))}>
                      
                      <span 
                        onClick={()=>{props.dispatch(deleteFolder(item.id,index))}}
                        className='delIcon'>&times;</span>
                         
                      <Typography className={classes.folderTitle} variant={'caption'}>{item.name}</Typography>
                    </div>
                  )
                })
                 
            )
                :

                props.photo.folders.map((item,index)=>{
                  return(
                    <div className={classes.folder} key={item.id} 
                    style={{backgroundImage:`url(${logo})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}
                    onDoubleClick={()=>props.dispatch(goToFolder(props.history,item.id))}
                     onDragOver={(e)=>e.preventDefault()}
                    onDrop={(e)=>props.dispatch(getDroppedItem(e,item.id))}>
                      
                      <span 
                        onClick={()=>{props.dispatch(deleteFolder(item.id,index))}}
                        className='delIcon'>&times;</span>
                         
                      <Typography className={classes.folderTitle} variant={'caption'}>{item.name}</Typography>
                    </div>
                  )
                })
              }
              <div style={{width:'100%',padding:5,margin:5,textAlign:'center'}}>
                <Button  variant="contained" style={props.photo.folders.length>9?{display:'block',display:'inline'}:{display:'none'}}>See all</Button>
              </div>
            </Paper>

            <Paper className={classes.photoPaper}>
            {
                props.photo.photos.map((item,index)=>{
                  return(
                    <div 
                    className={classes.folder} 
                    key={item.id} 
                    draggable 
                    onDragStart={(e)=>props.dispatch(dropToFolder(e,item,index))} 
                    >
                      <span 
                        onClick={()=>{props.dispatch(deletePhotoFromRoot(item,index))}}
                        className='delIcon'>&times;</span>
                      <img 
                      onClick={()=>props.dispatch(openSlider(index,props.photo.photos))}
                      draggable={false} 
                      src={item.photo.includes('blob')?item.photo:`http://localhost:5000/${item.photo}`} 
                      style={{margin:10, objectFit:'contain', width:'100%',height:'100%'}}/>

                   
                    </div>
                  )
                })
              }
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default connect(r=>r)(Photos);
