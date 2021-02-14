import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import Signin from './components/signin/signin'
import Signup from './components/signup/signup'
import Profile from './components/profile/Profile'
import Photos from './components/photos/Photos'
import DinamicPhotoPage from './components/DinamicPhotoPage/DinamicPhotoPage'
import VerifyPage from './components/verifyPage/verify'
import './components/style.css'
import SearchPage from './components/Search/SearchPage'
import DinamicUser from './components/user/DinamicUser'
import Requests from './components/Requests/Requests'
import Friends from './components/Friends/Friends'
import Messages from './components/Messages/Messages'
const routes = [
  {path:'/',component:Signin},
  {path:'/signup',component:Signup},
  {path:'/profile',component:Profile},
  {path:'/photos',component:Photos},
  {path:'/photos/folder/:id',component:DinamicPhotoPage},
  {path:'/verify',component:VerifyPage},
  {path:'/search',component:SearchPage},
  {path:'/user/:id',component:DinamicUser},
  {path:'/requests',component:Requests},
  {path:'/friends',component:Friends},
  {path:'/messages',component:Messages},
]
function App(){
  
  return(
    <BrowserRouter>
      {
        routes.map(item=>{
          return <Route key={item.path} exact path={item.path} component={item.component} />
        })
      }
    </BrowserRouter>
   )
}

export default connect(r=>r)(App)