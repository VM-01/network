import verify from "../states/verifyStates";

export default function verifyReducer(state = verify, action){
    const temp = {...state}

    if(action.type === 'verifyChangeFn'){
        temp[action.key]=action.value
        return temp
    }

    if(action.type === 'submitError'){
        temp.err=action.err
        return temp
    }

    return temp
}