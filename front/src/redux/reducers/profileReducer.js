import data from '../states/profileStates'

export default function profileReducer(state = data, action){
    const temp = {...state}

    if(action.type === 'loadProfile'){
        temp.profileData=action.data
        return temp
    }

    if(action.type === 'logOut'){
        sessionStorage.clear()
        action.history.push('/')
    }

    if(action.type === 'gotAllPhotos'){
        temp.allPhotos=action.data
        return temp
    }

    return temp
}