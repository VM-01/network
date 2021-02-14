import api from "./api"


// export function loadFriendsMessages(){
    
// }

export function loadMessages(item,socket){
    return (dispatch)=>{
        socket.emit('startChat',{token:sessionStorage.token,friendId:item.id})
        dispatch(selectFriend(item))
            
    }
}

export function updateMessages(data){
    return{
        type:'updateMessages',
        data 
    }
}

export function selectFriend(item){
    return {
        type:'selectFriend',item
    }
}

export function sendMessage(key,friend,message,socket){
    return (dispatch)=>{
       
        if(key === 'Enter'){
            if(!message){
                return
            }else{
                socket.emit('compose',{friendId:friend,text:message,token:sessionStorage.token})
            }
            console.log('all info',friend, message);
          
        }
    }
  }


