import api from "./api"



export function nextStep(obj1,step,obj2,obj3,history){
    return (dispatch)=>{
         const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(obj1).toLowerCase()) && step === 0){
            
            api.post('api/check-login', {login:obj1})
                 .then(r=>{
                    if('success' in r.data){
                        dispatch(nextStep1(1))
                    }else{
                        dispatch(setError(r.data.error))
                    }
                 })
        }else{
            dispatch(setError('Not valid mail'))
        }

        
            if(!obj2.name || !obj2.surname && step === 1){
                dispatch(setInfoError('Fill in all inputs'))
            }else{
                dispatch(nextStep2(2))
            }

            if(!obj3.password || !obj3.repassword && step === 2){
                dispatch(passwordError('Fill in all inputs'))
            }else if(obj3.repassword!==obj3.password){
                dispatch(passwordError('repeated password is not right'))
            }else if(obj3.password.length<6){
                dispatch(passwordError('Password must be not less then 6 charecters'))
            }else{
                api.post('api/register',{login:obj1, name:obj2.name, surname:obj2.surname, password:obj3.password, photo:'avatar.png', theme:'theme.jpeg'})
                    .then(r=>{
                        dispatch(passwordError(''))
                        if('success' in r.data){
                            history.push('/')
                        } 
                    })
            }
    }
}

export function nextStep2(step){
    return{
        type:'nextStep2',
        step
    }
}



export function passwordError(err){
    return{
        type:'passwordError',
        err
    }
}

export function setInfoError(err){
    return {
        type:'setInfoError',
        err
    }
}

export function infoChangeFn(key,value){
    return{
        type:'infoChangeFn',
        key,
        value
    }
}

export function setError(err){
    return{
        type:'setError',
        err
    }
}

export function nextStep1(step){
    return{
        type:'nextStep1',
        step
    }
}

export function backStep(){
    return{
        type:'backStep'
    }
}

export function resetStep(){
    return {
        type:'resetStep'
    }
}

export function mailChangeFn(key,value){
    return{
        type:'mailChangeFn',
        key,
        value
    }
}