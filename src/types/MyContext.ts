export interface Context {
  user?: User;
}


export interface User {
    id: number;
    name: string;
    roles: string[];
  }