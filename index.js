import TouchIDAndroid from './TouchID.android';
import TouchIDIOS from './TouchID.ios';
import TouchIDHarmony from './TouchID.harmony';
import {Platform} from 'react-native'
let TouchID
if (Platform.OS === 'harmony') {
    TouchID = TouchIDHarmony
} else if (Platform.OS === 'android') {
    TouchID = TouchIDAndroid
} else if (Platform.OS === 'ios') {
    TouchID = TouchIDIOS
}
export default TouchID;
