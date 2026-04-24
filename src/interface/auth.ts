export interface User {
  id: string;
  email: string;
  name: string;
  photo?: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Credentials {
  user: User;
  token: string;
}
