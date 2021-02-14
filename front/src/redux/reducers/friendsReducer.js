import data from '../states/friendsStates'

export default function friendsReducer(state = data,action){
    const temp  = {...state}

        if(action.type === 'updateFriends'){
            temp.friends=action.data
            return temp
        }

        if(action.type === 'spliceFriend'){
            temp.friends.splice(action.i,1)
            return temp
        }

    return temp
}