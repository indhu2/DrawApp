import { PERMISSIONS, check, request, RESULTS, openSettings } from "react-native-permissions";
import {Platform} from 'react-native';
import { isIos } from "./utils";


const PLATFORM_CAMERA_PERMISSIONS = {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
}

const PLATFORM_MICROPHONE_PERMISSIONS = {
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO
}

const PLATFORM_PHOTO_PERMISSIONS = {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE 
}

const REQUEST_PERMISSION_TYPE = {
    camera: PLATFORM_CAMERA_PERMISSIONS,
    photo_library: PLATFORM_PHOTO_PERMISSIONS,
    microphone: PLATFORM_MICROPHONE_PERMISSIONS,
}

const PERMISSION_TYPE = {
    camera: 'camera',
    photo: 'photo_library',
    microphone: 'microphone'
}

class AppPermission {
    checkPermission = async (type): Promise<boolean> => {
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]

        if (!permissions) {
            return true
        }
        
        try {
            const result = await check(permissions)
            if (result === RESULTS.GRANTED) { 
                return true
            } else {
                // if (isIos) {
                //     return openSettings()
                // }
                return this.requestPermission(permissions)
            }
        } catch (error) {
            console.log("app permission check permission error=== ", error);
            return false
        }
    }

    requestPermission = async (permissions): Promise<boolean> => {
        try{
            const result = await request(permissions);
            return result === RESULTS.GRANTED
        } catch(error) {
            console.log("app permission request permission error=== ", error);
            return false;
        }
    }
}

async function getPermissionStatus(
    type: Permission
  ): Promise<boolean> {
    const cameraPermissionResult = await check(REQUEST_PERMISSION_TYPE[type][Platform.OS]);
    switch (cameraPermissionResult) {
      case RESULTS.DENIED:
        return false;
      case RESULTS.LIMITED:  
        return true;
      case RESULTS.GRANTED:
        return true;
      case RESULTS.BLOCKED:
        return false
    }
    return false;
  }

 export const getPermission = async (type) => {
    const status = await getPermissionStatus(type);
    return status    
  }

const Permission = new AppPermission()
export {Permission, PERMISSION_TYPE}