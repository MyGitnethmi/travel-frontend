export interface CurrentUser {
  username: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  token: string;
  avatar: string;
}
