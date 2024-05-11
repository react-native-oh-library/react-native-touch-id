import { TurboModulesFactory ,RNPackage, RNOHContext } from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts"
import type {TurboModule ,TurboModuleContext} from '@rnoh/react-native-openharmony/ts'
import {CalculatorModule} from  './CalculatorModule'


class  CalculatorModuleFactory extends  TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (this.hasTurboModule(name)) {
      return new CalculatorModule(this.ctx);
    }

    return null
  }

  hasTurboModule(name: string): boolean {

    return name === TM.NativeHarmonyTouchId.NAME
  }
}

export  class  CalculatorPackage extends  RNPackage {
  createTurboModulesFactory(ctx: RNOHContext): TurboModulesFactory {
    return new CalculatorModuleFactory(ctx
    )
  }
}