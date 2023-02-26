/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
console.info = () => null;
console.warn = () => null;
console.error = () => null;

AppRegistry.registerComponent(appName, () => App);
