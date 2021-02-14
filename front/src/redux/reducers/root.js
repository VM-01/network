import { combineReducers } from "redux";
import signup from './signupReducer'
import signin from './loginReducer'
import profile from './profileReducer'
import photo from './photoReducer'
import search from './searchReducer'
import verify from './verifyReducer'
import user from './userReducer'
import request from './requestReducer'
import friends from './friendsReducer'
import messages from './messagesReducer'
const root = combineReducers({signup,signin,profile,photo,search,verify,user,request,friends,messages})

export default root