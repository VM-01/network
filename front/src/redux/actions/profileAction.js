import api from "./api"


export function loadData(token,history){
    return (dispatch)=>{
        api.post('api/loadProfileData',{token:token})
            .then(r=>{
                if('error' in r.data){
                     history.push('/')
                }
                dispatch(loadProfile(r.data))
            })
    }
}

export function loadProfile(data){
    return{
        type:'loadProfile',
        data
    }
}

export function logOut(history){
    return (dispatch)=>{
        api.post('api/log-out',{token:sessionStorage.token})
            .then(r=>{
                sessionStorage.clear()
                history.push('/')
            })
    }
}