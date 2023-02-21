import React from 'react';
import { ActivityIndicator} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { Colors } from '../../res';


const Loader = ({loader}: any ) => {  
  return (
    <ReactNativeModal isVisible={loader}>
    <ActivityIndicator
      color={Colors.primary}
      size={'large'}
      animating={loader}
    />
  </ReactNativeModal>
  )
}

export default Loader