export interface User {
  id: string;
  login: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
}
