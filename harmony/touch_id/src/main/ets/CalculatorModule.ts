import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts"
import userIAM_userAuth from '@ohos.userIAM.userAuth';


export class CalculatorModule extends TurboModule implements TM.NativeHarmonyTouchId.Spec {
  authenticate(reason?: string, config?: {
    title?: string | undefined;
    imageColor?: string | undefined;
    imageErrorColor?: string | undefined;
    sensorDescription?: string | undefined;
    sensorErrorDescription?: string | undefined;
    cancelText?: string | undefined;
    fallbackLabel?: string | undefined;
    passcodeFallback?: string | undefined;
    unifiedErrors?: boolean | undefined;
  }, callback?: (err: {}) => void): void {

    const authParam : userIAM_userAuth.AuthParam = {
      challenge: new Uint8Array([49, 49, 49, 49, 49, 49]),
      authType: [userIAM_userAuth.UserAuthType.FINGERPRINT],
      authTrustLevel: userIAM_userAuth.AuthTrustLevel.ATL1,
    };
    const widgetParam :userIAM_userAuth.WidgetParam = {
      title: reason ? reason : '请输入密码',
    };
    try {
      let userAuthInstance = userIAM_userAuth.getUserAuthInstance(authParam, widgetParam);
      console.log('get userAuth instance success');
      // 需要调用UserAuthInstance的start()接口，启动认证后，才能通过onResult获取到认证结果。
      userAuthInstance.on('result', {
        onResult (result) {
          if (result.result === 12500000) {
            callback(null)
          } else  {
            // 返回错误码
            callback({code:result.result})
          }

        }
      });
      userAuthInstance.start()
    } catch (error) {
     callback(error)
    }

  }
  isSupported(config: { unifiedErrors: boolean; }, callback: (err: {}, biometryType: string) => void): void {
    try {
      let enrolledState = userIAM_userAuth.getEnrolledState(userIAM_userAuth.UserAuthType.FINGERPRINT);
      callback(null,"TouchId")

    } catch (error) {
      callback(error,"")
    }
  }
}
