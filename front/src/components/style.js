import { makeStyles,fade } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      //  backgroundColor:'#383434'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: {
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
     
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor:'#383434'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      // height:'calc(100vh - 30vh)',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    },
    messagePaper:{
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height:'calc(100vh - 15vh)',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    },
    photoPaper:{
      display: 'flex',
      padding: 16,
      flexWrap:'wrap',
      marginBottom:10
    },
    loginBox: {
      display:'flex',
      flexDirection:'column'
    },
    folder:{
      width:150,
      height:200,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      cursor:'pointer',
      margin:12,
      justifyContent:'center',
      alignItems:'center',
      position:'relative',
      backgroundPosition: 'center'
    },
    uploadBlock:{
      width:200,
      height:100,
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    },
    profileBlock:{
      display:'block'
    },
    block:{
      display:'flex',
      flexWrap:'wrap',
      justifyContent:'center'
    },
    sliderBg:{
      display:'flex',
      position:'absolute',
      width:`calc(100% - ${drawerWidth}px)`,
      right:0,
      height:'100%',
      background:'rgba(0,0,0,0.6)',
      justifyContent:'center',
      alignItems:'center',
      zIndex:999
    },
    slider:{
      width:'100%',
      display:'flex',
      justifyContent:'center'
    },
    slideActions:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      width:'100%',
      height:'100vh'
    },
    slidePhoto:{
      width:'50%',
      height:'70vh',
      backgroundColor:'#383434',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    slideInfo:{
      width:'20%',
      backgroundColor:'white',
      padding:15
    },
    sImg:{
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    },
    folderTitle:{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      textAlign: 'center',
      background: 'linear-gradient(0deg,gray, transparent)',
      color:'white'
    },
    searchPaper:{
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display:'flex',
      flexWrap:'wrap'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    resultsblock:{
      width:'100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
      background:'white',
      position:'absolute',
      padding:10
    },
    results:{
      color:'black',
      display: 'flex',
      alignItems: 'center',
      marginBottom:10,
      cursor:'pointer',
      '&:hover':{
        background:'rgba(0,0,0,0.4)',
        transition:'0.3s'
      }
    },
    cardRoot: {
      maxWidth: 235,
      margin:10
    },
    media: {
      height: 140,
    },
    messanger:{
      position:'relative',
      width:'100%',
      height:'100%',
      display:'flex'
    },
    friendList:{
      width:'20%',
      borderRight:0,
      border:'1px solid rgba(0,0,0,.18)',
      overflowY: 'auto'
    },
    messages:{
      width:'80%',
      border:'1px solid rgba(0,0,0,.18)',
      // position:'relative'
    },
    friendListHeader:{
      padding:10,
      boxShadow: '0 0 4px rgba(0,0,0,.18)',
      display:'flex'
    },
    messageHeader:{
      padding:10,
      boxShadow: '0 0 4px rgba(0,0,0,.18)',
      height:56,
      display:'flex',
      alignItems:'center'
    },
    friendListBody:{
      padding:10
    },
    friend:{
      padding:10,
      marginBottom:15,
      display:'flex',
      alignItems:'center',
      cursor:'pointer',
      '&:hover':{
        background:'rgba(0,0,0,.18)',
        transition:'0.3s',
        borderRadius:5
      }
    },
    messageBody:{
      height:'calc(100% - 10%)'
    },
    messagesContent:{
      height:'90%'
    },
    writeMessage:{
      height:'10%',
      width:'100%',
      display:'flex',
      alignItems:'center',
      padding:3,
      borderTop:'1px solid rgba(0,0,0,.18)',
    },
    messInp:{
      width:'80%',
      height:'90%',
      padding:10,
      borderRadius:30,
      border:'none',
      background:'rgba(228 226 226 / 50%)',
       
      outline:'none'
    }
  }));
  
  export default useStyles