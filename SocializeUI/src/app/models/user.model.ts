/**
 * Created by eisaadil on 04/08/17.
 */
export class User {
  constructor(public username: string, public fullName: string, public password: string, public email: string, public id?: number) {
  }

  toString(): string {
    return (this.username + this.fullName + this.password + this.email + this.id);
  }
}
