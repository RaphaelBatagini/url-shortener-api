export namespace Http {
  export interface Request {
    params: any;
  };
  
  export interface Response {
    status: (httpStatusCode: number) => Response;
    send: (result?: any) => any;
    redirect: (url: string) => void;
  };
}