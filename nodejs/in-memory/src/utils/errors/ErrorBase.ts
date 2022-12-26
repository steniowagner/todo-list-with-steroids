type ErrorBaseParams<T> = {
  cause: any;
  name: T;
  message: string;
};

export class ErrorBase<T extends string> extends Error {
  cause: any;
  message: string;
  name: T;

  constructor(params: ErrorBaseParams<T>) {
    super();
    this.cause = params.cause;
    this.message = params.message;
    this.name = params.name;
  }
}
