import api from "./api"

export function getUser(id){
    return (dispatch)=>{
        api.post('api/get-user',{token:sessionStorage.token,id:id})
        .then(r=>{
            dispatch(update(r.data))
        })
    }
}

export function update(data){
    return{
        type:'update',
        data
    }
}

export function sendRequest(id){
    return (dispatch)=>{
        api.post('api/send-friend-request',{friendId:id, token: sessionStorage.token})
            .then(r=>{
                dispatch(reqRes(r.data));
            })
    }
}

export function reqRes(data){
    return{
        type:'reqRes',data
    }
}