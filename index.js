import TouchIDAndroid from 'react-native-touch-id/TouchID.android';
import TouchIDIOS from 'react-native-touch-id/TouchID.ios';
import TouchIDHarmony from './TouchID.harmony';
import { Platform } from 'react-native'

export const TouchID = Platform.OS === "ios"
  ? TouchIDIOS : Platform.OS === "android"
  ? TouchIDAndroid : Platform.OS === "harmony"
  ? TouchIDHarmony : LinearGradientWindows;

export default TouchID;

