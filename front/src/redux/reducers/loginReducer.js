import auth from '../states/loginStates'

export default function loginReducer(state = auth, action){
    const temp = {...state}

    if(action.type === 'loginChangeFn'){
        temp[action.key]=action.value
        return temp
    }

    if(action.type === 'setLoginError'){
        temp.errors[action.key]=`Fill in ${action.key} input`
        return temp
    }

    if(action.type === 'removeLoginErrors'){
        temp.errors[action.key]=''
        return temp
    }

    if(action.type === 'snackError'){
        temp.err=action.err
        return temp
    }

    return temp
}