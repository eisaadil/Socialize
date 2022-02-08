import {User} from "./user.model";
export class Chat {
  constructor(public text: string, public fromUser: User, public toUser: User, public date?: number, public id?: number) {
  }

  toString(): string {
    return (this.text + this.fromUser + this.toUser + this.date + this.id);
  }
}
