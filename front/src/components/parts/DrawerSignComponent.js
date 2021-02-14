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
import Menu from '../parts/menu';
import { connect } from 'react-redux';
import '../../App.css'
import { getAllPhotos } from '../../redux/actions/photoAction';

function DrawerSignComponent(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

   

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

export default connect(r=>r)(DrawerSignComponent);