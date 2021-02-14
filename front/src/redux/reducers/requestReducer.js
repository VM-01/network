import data from '../states/requestStates'

export default function requestReducer(state = data, action){
    const temp = {...state}

    if(action.type === 'updateRequests'){
        temp.requests=action.data
        return temp
    }

    if(action.type === 'sliceFriend'){
        temp.requests.splice(action.i,1)
        return temp
    }

    return temp
}