
import api from "./api"


export function search(value){
    return (dispatch)=>{
        dispatch(changeFn(value))
         
          api.post('search',{text:value,token:sessionStorage.token})
            .then(r=>{
                
                dispatch(updateSearch(r.data))
            })
    }
}

export function updateSearch(data){
    return{
        type:'updateSearch',
        data
    }
}

export function changeFn(value){
    return{
        type:'changeFn',
        value
    }
}

export function friendsProfile(id,history){
    return{
        type:'friendsProfile',
        id,
        history
    }
}