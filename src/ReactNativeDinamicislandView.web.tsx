import * as React from 'react';

import { ReactNativeDinamicislandViewProps } from './ReactNativeDinamicisland.types';

export default function ReactNativeDinamicislandView(props: ReactNativeDinamicislandViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
