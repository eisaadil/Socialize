import {User} from "./user.model";
export class Post {
  constructor(public text: string, public user: User, public date?: number, public id?: number) {
  }

  toString(): string {
    return (this.text + this.user + this.date + this.id);
  }
}
