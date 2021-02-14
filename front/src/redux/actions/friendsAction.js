import api from "./api"

export function loadFriends(){
    return (dispatch)=>{
        api.post('api/load-friends',{token:sessionStorage.token})
            .then(r=>{
                dispatch(updateFriends(r.data))
            })
    }
}

export function updateFriends(data){
    return{
        type:'updateFriends',
        data
    }
}

export function removeFriend(id,i){
   return (dispatch)=>{
    api.post('api/remove-friend',{token:sessionStorage.token, friendId:id})
    .then(r=>{
        dispatch(spliceFriend(i))
    })
   }
}

export function spliceFriend(i){
    return{
        type:'spliceFriend',i
    }
}