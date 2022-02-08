import {Component, Input, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {StompService} from "ng2-stomp-service";
import {Chat} from "../../models/chat.model";
import {ChatService} from "../../services/chat.service";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'sc-display-chats',
  templateUrl: './display-chats.component.html',
  styleUrls: ['./display-chats.component.css']
})
export class DisplayChatsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() chats: Chat[];
  loading: boolean;
  errorCode: number;
  @Input() toUser: User;
  fromUser: User = this.userService.getCurrentUser();
  init: boolean = false;

  private subscription: any;

  constructor(public stomp: StompService, public chatService: ChatService, public userService: UserService) {

  }

  ngOnInit() {
    this.stomp.configure({
      host: 'http://localhost:8080/socialize',
      debug: true,
      queue: {'init': false}
    });

    this.stomp.startConnect().then(() => {
      this.stomp.done('init');
      console.log('connected');

      this.stompSubscribe();

      // this.stomp.send('/app/chat', {toUserId: this.toUser.id, fromUserId: this.fromUser.id});
    });

    this.getConversation();
    this.init = true;

  }

  stompSubscribe() {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.stomp.subscribe('/queue/chatQueue/' + this.fromUser.username + '/' + this.toUser.username, (data) => {
      console.log("Websocket data: " + JSON.stringify(data));
      this.chats = data;
    });
  }

  getConversation() {
    this.chatService.getConversation(this.toUser.username).then((res) => {
      let responseJSON = JSON.parse(res.toString());
      let isConversationFetched: boolean = false;
      if (responseJSON.status == 1) isConversationFetched = true;

      this.loading = false;

      if (isConversationFetched) {
        this.errorCode = 0;
        this.chats = responseJSON.data;
        if (this.chats[0] == null) {
          this.errorCode = 1;
        }
      }
      else {
        this.errorCode = 1;
      }
      this.loading = false;
    }).catch((res) => {
      this.errorCode = 2;
      this.loading = false;
    });
  }

  ngOnChanges(changes) {
    if (this.toUser != null && this.init) {
      this.stompSubscribe();
      this.getConversation();
    }
  }



  ngOnDestroy() {
    if (this.subscription != null) this.subscription.unsubscribe();

    this.stomp.disconnect().then(() => {
      console.log('Connection closed')
    });
  }

}
