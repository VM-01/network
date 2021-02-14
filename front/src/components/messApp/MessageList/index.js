import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import './Message.css'
import './MessageList.css';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import { updateMessages } from '../../../redux/actions/messagesAction';

const ENDPOINT = "http://127.0.0.1:5000";
const socket = socketIOClient(ENDPOINT);


function MessageList(props) {
 
const messages = props.messages.messages
const MY_USER_ID = props.messages.me;
console.log(messages);
console.log(MY_USER_ID);

useEffect(()=>{
  socket.on('getMessages',(data)=>props.dispatch(updateMessages(data)))
},[])
    return(
      <div className="message-list">
        <Toolbar
          title={props.messages.selectedFriend&&props.messages.selectedFriend.name}
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">
          {
            messages.map(item=>{
              return(
                <div key={item.id} className={[
                  'message',
                  `${MY_USER_ID==item.messageSender ? 'mine' : MY_USER_ID==item.messageGetter?item.messageGetter:''}`,
                  
                ].join(' ')}>
                  
          
                  <div className="bubble-container">
                    <div className="bubble">
                      { item.message }
                    </div>
                  </div>
                </div>
              )
            })
          }
          {/* {renderMessages()} */}
          </div>

        <Compose rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
      </div>
    );
}

export default connect(r=>r)(MessageList)