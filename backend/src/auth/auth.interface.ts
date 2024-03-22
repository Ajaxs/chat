export interface Login {
  email: string;
  password: string;
}

export interface Registration {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface RefreshParams {
  refreshToken: string;
  [index: string]: any;
}

export enum Auth {
  InvalidLoginOrPassword = 'Invalid login or password',
}
