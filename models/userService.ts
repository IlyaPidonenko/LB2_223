// UserService.ts
import { User } from './user';

export class UserService {
  private users: User[] = [];

  // method for register
  public registerUser(username: string, password: string): void {
    const newUser = new User(this.users.length + 1, username, password);
    this.users.push(newUser);
  }

  // method for sign in
  public loginUser(username: string, password: string): User | null {
    const user = this.users.find((u) => u.getUsername === username && u.checkPassword(password));
    return user ? user : null;
  }
}
