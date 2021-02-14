import search from '../states/searchStates'

export default function searchReducer(state=search, action){
    const temp = {...state}

    if(action.type==='changeFn'){
        temp.searchInp=action.value
        // console.log(temp.searchInp);
        return temp
    }

    if(action.type === 'updateSearch'){
        temp.searchResults=action.data
        return temp
    }

    if(action.type === 'friendsProfile'){
        action.history.push(`/user/${action.id}`)
    }

    return temp
}