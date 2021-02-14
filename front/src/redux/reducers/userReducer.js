import data from '../states/usersStates'

export default function userReducer(state = data, action){
    const temp = {...state}

    if(action.type === 'update'){
        temp.user=action.data
        return temp
    }

    if(action.type === 'reqRes'){
        temp.err=action.data
        return temp
    }

    return temp
}