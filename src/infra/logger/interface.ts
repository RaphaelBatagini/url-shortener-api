export interface ILogger {
  error: (message: any, entity?: Error) => void;
  warning: (message: any) => void;
  info: (message: any) => void;
};