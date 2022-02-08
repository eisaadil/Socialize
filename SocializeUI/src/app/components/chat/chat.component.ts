import {Component, Input, OnChanges} from "@angular/core";
import {Chat} from "../../models/chat.model";
import {UserService} from "../../services/user.service";
import {ChatService} from "../../services/chat.service";
import {User} from "../../models/user.model";
@Component({
  selector: 'sc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges {

  @Input() chat: Chat = null;
  @Input() fromUser: User = null;
  @Input() toUser: User = null;
  isCurrentUser: boolean = true;


  constructor(public userService: UserService, public chatService: ChatService) {
  }

  ngOnChanges() {
    if (this.chat.fromUser.id == this.toUser.id) {
      let user: User = this.fromUser;
      this.fromUser = this.toUser;
      this.toUser = user;
      this.isCurrentUser = false;
    }
  }

}
