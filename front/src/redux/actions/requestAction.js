import api from "./api"


export function loadRequests(){
    return (dispatch)=>{
        api.post('api/load-requests',{token:sessionStorage.token})
            .then(r=>{
                dispatch(updateRequests(r.data))
                console.log(r.data);
            })
    }
}

export function updateRequests(data){
    return{
        type:'updateRequests',
        data
    }
}

export function acceptFriendRequest(id,index){
    return (dispatch)=>{
        api.post('api/accept-friend',{token:sessionStorage.token,friendId:id})
        .then(r=>{
            dispatch(sliceFriend(index))
            console.log(r.data);
        })}
}

export function declineFriendRequest(id,index){
    return (dispatch)=>{
        api.post('api/decline-friend',{token:sessionStorage.token,friendId:id})
        .then(r=>{
            dispatch(sliceFriend(index))
            console.log(r.data);
        })
    }
    
}

export function sliceFriend(i){
    return{
        type:'sliceFriend',i
    }
}