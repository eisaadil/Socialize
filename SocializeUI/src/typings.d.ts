/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare module 'stompjs';
declare module 'sockjs-client';
declare module 'ng2-completer';
/*
 var map = {
 ...
 'ng2-completer': 'node_modules/ng2-completer/ng2-completer.umd.js'
 }

 */
