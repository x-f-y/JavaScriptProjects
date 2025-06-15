/* declare var console: {
  log(message?: any, ...optionalParams: any[]): void,
  error(message?: any, ...optionalParams: any[]): void
}; */

/* interface Console {
  log: (message?: any, ...optionalParams: any[]) => void;
  error: (message?: any, ...optionalParams: any[]) => void;
}
declare var console: Console; */

/* declare namespace console {
  function log(message?: any, ...optionalParams: any[]): void
  function error(message?: any, ...optionalParams: any[]): void
} */

interface TimeHandler {
  (): void;
}
declare function setTimeout(handler: TimeHandler, miliSeconds?: number): number;
declare function setInterval(handler: TimeHandler, miliSeconds?: number): number;
