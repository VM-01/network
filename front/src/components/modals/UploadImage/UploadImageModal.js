import React from 'react';
import { connect } from 'react-redux';
import { closeUploadDialog, saveImage, imageChangeFn } from '../../../redux/actions/photoAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from '../../style';
import BackupIcon from '@material-ui/icons/Backup';
import { useTranslation } from 'react-i18next';

function UploadImage(props) {
     const classes = useStyles();
     const {t} = useTranslation()
     return (
        <Dialog open={props.photo.uploadDialog} onClose={()=>props.dispatch(closeUploadDialog())} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('upload')}</DialogTitle>
        <DialogContent>
            <label className={classes.uploadBlock} htmlFor='uploadimg'>
                <input
                  type='file'
                  defaultValue={props.photo.uploadImage}
                  onChange={(e)=>props.dispatch(imageChangeFn('uploadImage',e.target.files))} 
                  style={{display:'none'}}
                  id='uploadimg' />  
                    
                {
                    !props.photo.uploadImage[0]?(
                        <BackupIcon style={{fontSize:50,color:'rgba(0, 0, 0, 0.54)'}}/>
                    ):(
                        <img src={URL.createObjectURL(props.photo.uploadImage[0])} 
                        style={{position:'relative', width:'100%', height:'100%',objectFit:'contain'}}
                        />
                    )
                }
            </label>
            <TextField 
            value={props.photo.imageName} 
            onChange={(e)=>props.dispatch(imageChangeFn('imageName', e.target.value))} 
            placeholder={t('imgN')}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.dispatch(closeUploadDialog())} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={()=>props.dispatch(saveImage(props.photo.uploadImage,props.photo.imageName))} color="primary">
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default connect(r=>r)(UploadImage);