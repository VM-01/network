import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { useTheme } from '@material-ui/core/styles';
import logo from '../../logo.png'
import useStyles from '../style'
import Menu from '../parts/Sidebar';
import { connect } from 'react-redux';
import { loadData, logOut } from '../../redux/actions/profileAction';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import '../../App.css'
import { Button, InputBase, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { friendsProfile, search } from '../../redux/actions/searchAction';




function DrawerComponent(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);


 
    
                                      

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

useEffect(()=>{
  if(!sessionStorage.token){
    props.history.push('/')
  }
},[sessionStorage.token])
console.log(props);

useEffect(()=>{
  props.dispatch(loadData(sessionStorage.token, props.history))
},[])
 
     return (
        <>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar style={{display:'flex',justifyContent:'space-between',  backgroundColor:'#383434'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div 
              style={
                  {
                    display:'flex', 
                    alignItems:'center', 
                    backgroundImage:`url(${logo})`,
                    backgroundSize: 'cover', 
                    width: 155, 
                    height: 50, 
                    backgroundRepeat: 'no-repeat', 
                    backgroundPosition: '50% 35%'
                  }
                }>
                </div>
            <div className={classes.search} style={props.history.location.pathname=='/search'?{display:'none'}:{display:'block'}}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              
              value={props.search.searchInp}
              onChange={(e)=>{props.dispatch(search(e.target.value))}}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <div className={classes.resultsblock} style={props.search.searchInp.length==''?{display:'none'}:{display:'grid'}}>
            {
            props.search.searchResults.length>2
            ?
             props.search.searchResults.slice(0,2).map(item=>{
               return <span onClick={()=>props.dispatch(friendsProfile(item.id,props.history))} className={classes.results} key={item.id}><img width='50' src={`http://localhost:5000/${item.photo}`} style={{marginRight:10}}/> <Typography>{item.name}</Typography></span> 
              })
            :  props.search.searchResults.length==0&&props.search.searchInp.length>0
            ?(
              <span className={classes.results}>no result</span> 
            )
            :(
              props.search.searchResults.map(item=>{
                return <span onClick={()=>props.dispatch(friendsProfile(item.id,props.history))} className={classes.results} key={item.id}><img width='50' src={`http://localhost:5000/${item.photo}`} style={{marginRight:10}}/> <Typography>{item.name}</Typography></span> 
               })
            )
            }
            
            <Button 
            variant={'contained'} 
            style={props.search.searchResults.length>1?{display:'block'}:{display:'none'}}
            onClick={()=>props.history.push('/search')}
            >See all</Button>
            </div>
            </div>
            <IconButton onClick={()=>props.dispatch(logOut(props.history))}>
                <ExitToAppIcon htmlColor={'red'}/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={props.data}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
  
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
             <Menu data={props.profile.profileData}/>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <Menu data={props.profile.profileData}/>
            </Drawer>
          </Hidden>
        </nav>
       </>
    );
}

export default connect(r=>r)(DrawerComponent);