import { registerWebModule, NativeModule } from 'expo';

import { ReactNativeDinamicislandModuleEvents } from './ReactNativeDinamicisland.types';

class ReactNativeDinamicislandModule extends NativeModule<ReactNativeDinamicislandModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ReactNativeDinamicislandModule, 'ReactNativeDinamicislandModule');
