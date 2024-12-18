/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    authenticate: (reason?: string, config?: {
        title?: string,
        imageColor?: string,
        imageErrorColor?: string,
        sensorDescription?: string,
        sensorErrorDescription?: string,
        cancelText?: string,
        fallbackLabel?: string,
        passcodeFallback?: string,
        unifiedErrors?: boolean
    }, callback?: (err: {}) => void) => void;
    isSupported: (config: { unifiedErrors: boolean }, callback: (err: {}, biometryType: string) => void) => void;
}

export default TurboModuleRegistry.get<Spec>('NativeHarmonyTouchId') as Spec | null;

