// Reexport the native module. On web, it will be resolved to ReactNativeDinamicislandModule.web.ts
// and on native platforms to ReactNativeDinamicislandModule.ts
export { default } from './ReactNativeDinamicislandModule';
export { default as ReactNativeDinamicislandView } from './ReactNativeDinamicislandView';
export * from  './ReactNativeDinamicisland.types';
