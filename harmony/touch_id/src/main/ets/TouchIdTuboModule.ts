/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts"
import userIAM_userAuth from '@ohos.userIAM.userAuth';

export class TouchIdTuboModule extends TurboModule implements TM.NativeHarmonyTouchId.Spec {
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
    let rea = this.ctx.uiAbilityContext.resourceManager.getStringByNameSync("reason")
    const widgetParam :userIAM_userAuth.WidgetParam = {
      title: reason ? reason : rea,
    };
    try {
      let userAuthInstance = userIAM_userAuth.getUserAuthInstance(authParam, widgetParam);
      userAuthInstance.on('result', {
        onResult (result) {
          if (result.result === userIAM_userAuth.UserAuthResultCode.SUCCESS) {
            callback(null)
          } else {
            // return error code
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
