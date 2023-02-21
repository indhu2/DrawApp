import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainFrame } from './common/components/MainFrame';
import { Colors } from './common/res';

const App = () => {
  return ( 
<MainFrame containerStyle={{flex: 1,}}>
      <Text style={{color: Colors.black}}>App</Text>
   </MainFrame>
  );
};
export default App;
