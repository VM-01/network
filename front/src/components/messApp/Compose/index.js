import React, { useState } from 'react';
import './Compose.css';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { sendMessage } from '../../../redux/actions/messagesAction';

 const ENDPOINT = "http://127.0.0.1:5000";
 const socket = socketIOClient(ENDPOINT);

function Compose(props) {
  const [cval,setval] = useState('')
 
  const changeFn=(value)=>{
    setval(value)
  }

  console.log('adfgfukeygrfguiaewhf',props);
    return (
      <div className="compose">
         
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
          value={cval}
          onChange={(e)=>changeFn(e.target.value)}
          onKeyPress={e=>props.dispatch(sendMessage(e.key,props.messages.selectedFriend.id,cval,socket))}
        />

        {
          props.rightItems
        }
      </div>
    );
}

export default connect(r=>r)(Compose)