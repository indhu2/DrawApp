import AsyncStorage from '@react-native-async-storage/async-storage';

// Store Async
export const asyncStore = async(key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('error', e);
  }
}

// Get Async
export const asyncGet = async(key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error('error', e);
  }
}

// Remove Async
export const asyncRemove = async(key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('error', e);
  }
}