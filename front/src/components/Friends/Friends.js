import { Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { acceptFriendRequest, declineFriendRequest } from '../../redux/actions/requestAction';
import DrawerComponent from '../parts/DrawerComponent';
import useStyles from '../style'
import { Button, Card, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { loadFriends, removeFriend } from '../../redux/actions/friendsAction';
import { friendsProfile } from '../../redux/actions/searchAction';

function Friends (props){
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
          <Paper className={classes.photoPaper} style={{marginTop:70}}>
            <Typography style={props.friends.friends.length==0?{display:'block'}:{display:'none'}}>There are no Friends</Typography>
          <Card.Group>
              {
                props.friends.friends.map((item,index)=>{
                  return(
                    <Card key={item.id}>
                    <Card.Content>
                      <Image
                        floated='right'
                        size='mini'
                        src={`http://localhost:5000/${item.photo}`}
                      />
                      <Card.Header>{item.name}</Card.Header>
                      {/* <Card.Description>
                        Steve wants to add you to <strong>friends</strong>
                      </Card.Description> */}
                    </Card.Content>
                    <Card.Content extra>
                      <div className='ui two buttons'>
                        <Button basic color='green' onClick={()=>props.dispatch(friendsProfile(item.id,props.history))}>
                          See profile
                        </Button>
                        <Button basic color='red' onClick={()=>{props.dispatch(removeFriend(item.id,index))}}>
                          Remove 
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

export default connect(r=>r)(Friends)