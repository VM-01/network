import api from "./api"


export function verifyChangeFn(key,value){
    return{
        type:'verifyChangeFn',key,value
    }
}

export function submit(login,code,history){
    return (dispatch)=>{
        if(!login || !code){
            dispatch(submitError({error:'Fill in all inputs'}))
        }else{
            api.post('api/verify',{login,code})
                .then(r=>{
                    if('error' in r.data){
                    }else{
                        dispatch(submitError(r.data))
                        history.push('/')
                    }  
                })
        }
    }
}

export function submitError(err){
    return{
        type:'submitError',err
    }
}