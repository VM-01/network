import data from '../states/photoState'

export default function photoReducer(state = data, action){
    const temp = {...state}

    if(action.type === 'createFolder'){
        temp.folderDialog = true
        return temp
    }

    if(action.type === 'closeFolderDialog'){
        temp.folderDialog = false
        temp.folderName=''
        return temp
    }

    if(action.type === 'folderChangeFn'){
        temp[action.key] = action.value
        return temp
    }

    if(action.type === 'saveThisFolder'){
        temp.folders.push(action.obj)
    }

    if(action.type === 'updateFolders'){
        temp.folders=action.data
        return temp
    }

    if(action.type === 'uploadPhoto'){
        temp.uploadDialog=true
        return temp
    }

    if(action.type === 'closeUploadDialog'){
        temp.uploadDialog=false
        temp.imageName=''
        temp.uploadImage=''
        return temp
    }

    if(action.type === 'imageChangeFn'){
        temp[action.key] = action.value
        return temp
    }

    if(action.type === 'pushToImageArr'){
        temp.photos.push(action.obj)
        return temp
    }

    if(action.type === 'updatePhotos'){
        temp.photos=action.data[0]
        return temp
    }

    if(action.type === 'dropToFolder'){
        action.e.dataTransfer.setData('obj',JSON.stringify(action.image))
    }

    if(action.type === 'droppedImage'){
        temp.photos.find((item,index)=>{
            if(item.id==action.id){
                temp.photos.splice(index,1)
            }
        })
        return temp
    }

    if(action.type === 'updateFolderPhotos'){
        temp.photosInFolder=action.data 
        
        return temp
    }

    if(action.type === 'goToFolder'){
        action.history.push(`/photos/folder/${action.folder}`)
    }

    if(action.type === 'closeUploadDialogFolder'){
        temp.uploadDialogInFolder=false
         temp.uploadImage=''
         temp.imageName=''
        return temp
    }

    if(action.type === 'uploadPhotoInFolderDialog'){
        temp.uploadDialogInFolder=true
        temp.imageName=''
        temp.uploadImage=''
        return temp
    }

    if(action.type === 'addToFolder'){
        temp.photosInFolder.push(action.obj)
        return temp
    }

    if(action.type === 'deletePhotoFromFolder'){
        temp.photosInFolder.splice(action.i,1)
        return temp
    }

    if(action.type === 'deletePhoto'){
        temp.photos.splice(action.i,1)
        return temp
    }

    if(action.type === 'removeFolder'){
        temp.folders.splice(action.i,1)
        return temp
    }

    if(action.type === 'openSlider'){
        temp.slideOpen=true
        temp.slideNum=action.i
        temp.slideArr=action.arr
        return temp
    }

    if(action.type === 'incr'){
        if(temp.slideNum>temp.slideArr.length-2){
            temp.slideNum=0
        }else{
            temp.slideNum++
        }
        return temp
    }
    if(action.type === 'decr'){
        if(temp.slideNum==0){
            temp.slideNum=temp.slideArr.length-1
        }else{
            temp.slideNum--
        }
        
        return temp
    }
    if(action.type === 'closeSlider'){
        temp.slideOpen=false
        return temp
    }

    return temp
}