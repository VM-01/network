import api from "./api"


export function createFolder(){
    return{
        type:'createFolder'
    }
}

export function closeFolderDialog(){
    return{
        type:'closeFolderDialog'
    }
}

export function saveFolder(folderName){
    return (dispatch)=>{
        
        api.post('api/save-folder',{token:sessionStorage.token,name:folderName})
            .then(r=>{
                 dispatch(saveThisFolder({id:r.data.id,name:r.data.name}))
            })
        dispatch(closeFolderDialog())
    }
}

export function saveThisFolder(obj){
    return{
        type:'saveThisFolder',
        obj
    }
}

export function folderChangeFn(key,value){
    return{
        type:'folderChangeFn',
        key,
        value
    }
}

export function uploadPhoto(){
    return{
        type:'uploadPhoto'
    }
}

export function closeUploadDialog(){
    return{
        type:'closeUploadDialog'
    }
}

export function imageChangeFn(key,value){
    return{
        type:'imageChangeFn',
        key,
        value
    }
}

export function loadFolders(){
    return (dispatch)=>{
        api.post('api/load-folders',{token:sessionStorage.token})
            .then(r=>{
                 dispatch(updateFolders(r.data[0]))
            })
    }
}

export function updateFolders(data){
    return{
        type: 'updateFolders',
        data
    }
}

export function getAllPhotos(){
    return (dispatch)=>{
        api.post('api/get-all-photos',{token:sessionStorage.token})
            .then(r=>{

                let data = r.data.photos.concat(r.data.photosInFolders)
                dispatch(gotAllPhotos(data))
            })
    }
}

export function gotAllPhotos(data){
    return{
        type:'gotAllPhotos',
        data
    }
}

export function saveImage(photo,imageName){
    return (dispatch)=>{
        if(!photo){
            dispatch(closeUploadDialog())
        }else{
            let form = new FormData()
            form.append('photo', photo[0])
            form.append('name', imageName)
            form.append('token', sessionStorage.token)
            api.post('api/upload-image', form)
                .then(r=>{
                    dispatch(pushToImageArr({id:r.data.id, photo:r.data.photo,name:imageName}))
                    dispatch(closeUploadDialog())
                })
        }
    }
}

export function saveImageInFolder(photo,name,id){
    return (dispatch)=>{
        if(!photo){
            dispatch(closeUploadDialogFolder())
        }else{
            let form = new FormData()
            form.append('photo',photo[0])
            form.append('name',name)
            form.append('folderId', id)
            form.append('token',sessionStorage.token)
    
            api.post('api/upload-image-to-folder',form)
                .then(r=>{
                    dispatch(closeUploadDialogFolder())
                    dispatch(addToFolder({name:r.data.name, photo:r.data.photo, id:r.data.id}))
                })
        }
        
    }
}

export function pushToImageArr(obj){
    return{
        type:'pushToImageArr',
        obj
    }
}

export function loadPhotos(){
    return (dispatch)=>{
        api.post('api/load-photos', {token:sessionStorage.token})
            .then(r=>{
       
                dispatch(updatePhotos(r.data))
            })
    }
}

export function updatePhotos(data){
    return{
        type:'updatePhotos',
        data
    }
}

export function dropToFolder(e,image,index){
    return{
        type:'dropToFolder',
        e,image,index
    }
}

export function getDroppedItem(e,folderId){
    return (dispatch)=>{
        let a = e.dataTransfer.getData('obj')
        let b = JSON.parse(a)
        b.folderId=folderId
        b.token=sessionStorage.token
         api.post('api/move-to-folder',b)
            .then(r=>{
                  if(r.data){
                      dispatch(droppedImage(b.id))
                  }
            })
    }
}

export function droppedImage(id){
    return{
        type:'droppedImage',
        id
    }
}

export function goToFolder(history, folder){
    return{
        type:'goToFolder',
        history,
        folder
    }
}

export function updateFolderPhotos(data){
    return{
        type:'updateFolderPhotos',
        data
    }
}

export function updatePhotosInFolders(id){
    return (dispatch)=>{
        api.post('api/get-photo-from-folder',{id:id,token:sessionStorage.token})
            .then(r=>{
                dispatch(updateFolderPhotos(r.data))
            })
    }
}

export function closeUploadDialogFolder(){
    return{
        type:'closeUploadDialogFolder'
    }
}

export function uploadPhotoInFolderDialog(){
    return{
        type:'uploadPhotoInFolderDialog'
    }
}

export function addToFolder(obj){
    return {
        type:'addToFolder',
        obj
    }
}

export function deletePhotoFromFolder(item,index,id){
    
    return (dispatch)=>{
        // return console.log(item,index,id);
          api.post(`api/delete-photo-from-folder`,{photo:item,token:sessionStorage.token,folderId:id})
            .then(r=>{
             
                dispatch(deletePhoto('folder',index))
            })
    }
}

export function deletePhotoFromRoot(item,index){
    return (dispatch)=>{
        api.post('api/delete-photo',{item,token:sessionStorage.token})
            .then(r=>{
            
                dispatch(deletePhoto('deletePhoto',index))
            })
    }
}

export function deletePhoto(loc,i){
    return loc==='folder'?{ type:'deletePhotoFromFolder',i }:{ type:'deletePhoto',i }
}

export function deleteFolder(id,index){
    return (dispatch)=>{
        api.post('api/delete-folder',{token:sessionStorage.token,id})
            .then(r=>{
        
                dispatch(removeFolder(index))
            })
    }
}

export function removeFolder(i){
    return{
        type:'removeFolder',i
    }
}

export function openSlider(i,arr){
    return {
        type:'openSlider',
        i,
        arr
    }
}

export function decr(){
    return{
        type:'decr'
    }
}

export function incr(){
    return{
        type:'incr'
    }
}

export function closeSlider(){
    return{
        type:'closeSlider'
    }
}