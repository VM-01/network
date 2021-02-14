import { Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { acceptFriendRequest, declineFriendRequest, loadRequests } from '../../redux/actions/requestAction';
import DrawerComponent from '../parts/DrawerComponent';
import useStyles from '../style'
import { Button, Card, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function Requests (props){
    const { window } = props;
    const classes = useStyles();
    const container = window !== undefined ? () => window().document.body : undefined;
    const {t} = useTranslation()
    const { enqueueSnackbar } = useSnackbar();
    useEffect(()=>{
        props.dispatch(loadRequests())
    },[])
    console.log(props);
    return(
    <div className={classes.root}>
       <DrawerComponent data={container} history={props.history}/>
        <main className={classes.content}>
          <Paper className={classes.photoPaper} style={{marginTop:70}}>
            <Typography style={props.request.requests.length==0?{display:'block'}:{display:'none'}}>There are no requests</Typography>
          <Card.Group>
              {
                props.request.requests.map((item,index)=>{
                  return(
                    <Card key={item.id}>
                    <Card.Content>
                      <Image
                        floated='right'
                        size='mini'
                        src={`http://localhost:5000/${item.photo}`}
                      />
                      <Card.Header>{item.name}</Card.Header>
                      <Card.Description>
                        Steve wants to add you to <strong>friends</strong>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className='ui two buttons'>
                        <Button basic color='green' onClick={()=>{props.dispatch(acceptFriendRequest(item.id,index))}}>
                          Approve
                        </Button>
                        <Button basic color='red' onClick={()=>{props.dispatch(declineFriendRequest(item.id,index))}}>
                          Decline
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                  )
                })
              }
              </Card.Group>
          </Paper>
        </main>
      </div>

    )

}

export default connect(r=>r)(Requests)