import { requireNativeView } from 'expo';
import * as React from 'react';

import { ReactNativeDinamicislandViewProps } from './ReactNativeDinamicisland.types';

const NativeView: React.ComponentType<ReactNativeDinamicislandViewProps> =
  requireNativeView('ReactNativeDinamicisland');

export default function ReactNativeDinamicislandView(props: ReactNativeDinamicislandViewProps) {
  return <NativeView {...props} />;
}
