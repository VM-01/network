import { green } from '@material-ui/core/colors';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import shave from 'shave';
import { loadMessages } from '../../../redux/actions/messagesAction';

import './ConversationListItem.css';

import socketIOClient from "socket.io-client";

 const ENDPOINT = "http://127.0.0.1:5000";
 const socket = socketIOClient(ENDPOINT);

function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

    // const { photo, name, text } = props.data;
console.log('friends',props);
    return (
      <>
      {
        props.friends.friends.map(item=>{
          const style = JSON.stringify(props.messages.selectedFriend)===JSON.stringify(item)?{background:'rgba(0,0,0,.18)'}:{background:'white'}
          return(
            <div className="conversation-list-item" key={item.id} style={style} onClick={()=>props.dispatch(loadMessages(item,socket))}>
              <img className="conversation-photo" src={`http://localhost:5000/${item.photo}`} alt="conversation" />
              <div className="conversation-info">
                <h1 className="conversation-title">{ item.name }</h1>
                {/* <p className="conversation-snippet">{ text }</p> */}
              </div>
            </div>
          )
        })
      }
      
      </>
    );
}

export default connect(r=>r)(ConversationListItem)