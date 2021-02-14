import React from 'react';
import { connect } from 'react-redux';
import { closeFolderDialog, saveFolder, folderChangeFn } from '../../../redux/actions/photoAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';

function FolderModal(props) {
  const {t} = useTranslation()
    return (
        <Dialog open={props.photo.folderDialog} onClose={()=>props.dispatch(closeFolderDialog())} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('createF')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('createFD')}
          </DialogContentText>
          <TextField
            value={props.photo.folderName}
            onChange={(e)=>props.dispatch(folderChangeFn('folderName',e.target.value))}
            autoFocus
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.dispatch(closeFolderDialog())} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={()=>props.dispatch(saveFolder(props.photo.folderName))} color="primary">
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default connect(r=>r)(FolderModal);