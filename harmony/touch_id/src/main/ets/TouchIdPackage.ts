import { TurboModulesFactory ,RNPackage, UITurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts"
import type {TurboModule ,TurboModuleContext} from '@rnoh/react-native-openharmony/ts'
import { TouchIdTuboModule } from './TouchIdTuboModule'

class  TouchIdModuleFactory extends  TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (this.hasTurboModule(name)) {
      return new TouchIdTuboModule(this.ctx);
    }
    return null
  }

  hasTurboModule(name: string): boolean {
    return name === TM.NativeHarmonyTouchId.NAME
  }
}

export  class  TouchIdPackage extends  RNPackage {
  createTurboModulesFactory(ctx: UITurboModuleContext): TurboModulesFactory {
    return new TouchIdModuleFactory(ctx
    )
  }
}