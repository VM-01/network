import data from '../states/messagesStates'

export default function messageReducer(state = data,action){
    const temp = {...state}

    if(action.type === 'updateMessages'){
         temp.messages=action.data.messages
         temp.me=action.data.me
    }

    if(action.type === 'selectFriend'){
        temp.selectedFriend=action.item
    }

    return temp
}