/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

import { NativeModules, processColor,
    TurboModuleRegistry } from 'react-native';
import { harmonyErrorMap, androidModuleErrorMap } from './data/errors';
import { getError, TouchIDError, TouchIDUnifiedError } from './errors';
// const NativeTouchID = NativeModules.FingerprintAuth;

var NativeTouchID =TurboModuleRegistry ? 
TurboModuleRegistry.get('NativeHarmonyTouchId') : NativeModules.NativeTouchID;

export default {
  isSupported(config) {
    return new Promise((resolve, reject) => {
        NativeTouchID.isSupported(config, (error, biometryType) => {
          if (error) {
            return reject(createError(config, error));
          }
  
          resolve(biometryType);
        });
      });
  },

  authenticate(reason, config) {
   
    var authConfig = Object.assign({}, config);
    var imageColor = processColor(authConfig.imageColor);
    var imageErrorColor = processColor(authConfig.imageErrorColor);

    authConfig.imageColor = imageColor;
    authConfig.imageErrorColor = imageErrorColor;

    return new Promise((resolve, reject) => {
      NativeTouchID.authenticate(
        reason,
        authConfig,
        (error) => {
            if (error) {
                return reject(createError(authConfig, error));
            }
            resolve(true);
        }
      );
    });
  }
};

function createError(config, error) {
 
    const { unifiedErrors } = config || {}
    const message = harmonyErrorMap[error.code]
    console.log(unifiedErrors)
    if (unifiedErrors) {
      return new TouchIDUnifiedError({message:message,code:error.code});
    }
    console.log()
  return new TouchIDError('Touch ID Error', {message:message}, error.code);
}
