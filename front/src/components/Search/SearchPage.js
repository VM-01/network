import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DrawerComponent from '../parts/DrawerComponent';
import useStyles from '../style'
import { useTranslation } from 'react-i18next';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@material-ui/core';
import { friendsProfile, search } from '../../redux/actions/searchAction';
import { sendRequest } from '../../redux/actions/userAction';
import { useSnackbar } from 'notistack';

function Search (props){
    const { window } = props;
    const classes = useStyles();
    const container = window !== undefined ? () => window().document.body : undefined;
    const {t} = useTranslation()
    const { enqueueSnackbar } = useSnackbar();

     
  useEffect(()=>{
      for(let key in props.user.err){
        props.user.err && enqueueSnackbar(props.user.err[key],  {variant:key} ) 
      }
  },[props.user.err])
    
      
   
    console.log(props);
    return(
        <div className={classes.root}>
       <DrawerComponent data={container} history={props.history}/>
        <main className={classes.content}>
          <Paper className={classes.paper} style={{marginTop:50}}>
          <FormControl variant="outlined" style={{width:'80%'}}>
        <InputLabel htmlFor="component-outlined">Search ...</InputLabel>

        <OutlinedInput 
        id="component-outlined" 
        value={props.search.searchInp} 
        onChange={(e)=>props.dispatch(search(e.target.value))} 
        label="Search ..." />

      </FormControl>
          </Paper>
          <br/>
          <Typography>Found people {props.search.searchResults.length}</Typography>
          <Paper className={classes.searchPaper} style={{marginTop:20}}>
            {
              props.search.searchResults.map(item=>{
                return(
                  <Card key={item.id} className={classes.cardRoot}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`http://localhost:5000/${item.photo}`}
                        title={item.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary" onClick={()=>props.dispatch(friendsProfile(item.id,props.history))}>
                        See profile
                      </Button>
                      <Button size="small" color="primary" onClick={()=>props.dispatch(sendRequest(item.id))}>
                        Add to friends
                      </Button>
                    </CardActions>
                  </Card>
                )
              })
            }
          </Paper>
        </main>
      </div>
    )

}

export default connect(r=>r)(Search)