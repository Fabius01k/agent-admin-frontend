const AUTH_STORAGE_KEY = 'auth_token';

export const authStorage = {
  getToken(): string | null {
    return localStorage.getItem(AUTH_STORAGE_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(AUTH_STORAGE_KEY, token);
  },

  removeToken(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  },
};
