import { Paper } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import DrawerComponent from '../parts/DrawerComponent';
import useStyles from '../style'
import 'semantic-ui-css/semantic.min.css'
import { loadFriends } from '../../redux/actions/friendsAction';
import Messenger from '../messApp/Messenger';

function Messages (props){
    const { window } = props;
    const classes = useStyles();
    const container = window !== undefined ? () => window().document.body : undefined;
    const {t} = useTranslation()
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        props.dispatch(loadFriends())
    },[])

    return(
    <div className={classes.root}>
       <DrawerComponent data={container} history={props.history}/>
        <main className={classes.content}>
            <div style={{marginTop:70}}>
                <Messenger />
            </div>
        </main>
    </div>
    )

}

export default connect(r=>r)(Messages)