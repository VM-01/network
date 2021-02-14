import api from "./api"



export function loginChangeFn(key,value){
    return{
        type:'loginChangeFn',
        key,
        value
    }
}

export function login(data,history){
    return (dispatch)=>{
        
        for(let key in data){
            if(!data[key]){
                dispatch(setLoginError(key))
                
            }else{
                dispatch(removeLoginErrors(key))
            }
        }

        if(data.login && data.password){
            api.post('api/login', data)
                .then(r=>{
                    if('error' in r.data){
                        dispatch(snackError(r.data))
                    }else if('token' in r.data){
                        dispatch(snackError({success:'Log in'}))
                        sessionStorage.token = r.data.token
                        history.push('/profile')
                    } 
                })
         }
    }
}

export function snackError(err){
    return{
        type:'snackError',
        err
    }
}

export function logInByKey(key,data,history){
    return (dispatch)=>{
        for(let name in data){
            if(!data[name]){
                dispatch(setLoginError(name))
                
            }else{
                dispatch(removeLoginErrors(name))
            }
        }

        if(key=='Enter'){
            api.post('api/login', data)
                .then(r=>{
                    if('error' in r.data){
                        console.log(r.data)
                        dispatch(snackError(r.data))
                        dispatch(loginAccountError(r.data.error))
                    }else if('token' in r.data){
                        dispatch(snackError({success:'Log in'}))
                        sessionStorage.token = r.data.token
                        history.push('/profile')
                    } 
                })
         }
    }
}

export function loginAccountError(error){
    return{
        type:'loginAccountError',
        error
    }
}

export function removeLoginErrors(key){
    return{
        type:'removeLoginErrors',
        key
    }
}

export function setLoginError(key){
    return{
        type:'setLoginError',
        key
    }
}