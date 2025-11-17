import { NativeModule, requireNativeModule } from 'expo';

import { ReactNativeDinamicislandModuleEvents } from './ReactNativeDinamicisland.types';

declare class ReactNativeDinamicislandModule extends NativeModule<ReactNativeDinamicislandModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ReactNativeDinamicislandModule>('ReactNativeDinamicisland');
