import auth from '../states/sigupStates'

export default function signupReducer(state = auth, action){
    const temp = {...state}

    if(action.type === 'nextStep1'){
        temp.registerSteps.steps=action.step
        temp.errors.login=''
        temp.errors.info=''
        temp.errors.password=''
        return temp
    }

    if(action.type === 'nextStep2'){
        temp.registerSteps.steps=action.step
        temp.errors.info=''
        return temp
    }

    if(action.type === 'setInfoError'){
        temp.errors.info=action.err
        return temp
    }

    if(action.type === 'backStep'){
        temp.registerSteps.steps-=1
        return temp
    }

    if(action.type === 'resetStep'){
        temp.registerSteps.steps=0
        return temp
    }

    if(action.type === 'mailChangeFn'){        
        temp[action.key]=action.value
        return temp 
    }

    if(action.type === 'infoChangeFn'){
        temp[action.key]=action.value
        return temp
    }

    if(action.type === 'setError'){
        temp.errors.login=action.err
        return temp
    }

    if(action.type === 'passwordError'){
        temp.errors.password=action.err
        return temp
    }

    return temp
}