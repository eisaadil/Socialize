import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Router} from "@angular/router";
import "rxjs/Rx";
import {UserService} from "./user.service";
import {Chat} from "../models/chat.model";
import {User} from "../models/user.model";

@Injectable()
export class ChatService {
  constructor(public http: Http, public router: Router, public userService: UserService) {
  }

  createChat(chatText: string, toUser: User): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiURL = `http://localhost:8080/chat/createChat`;
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      let chat: Chat = new Chat(chatText, this.userService.getCurrentUser(), toUser);
      console.log("stringified in chat service " + JSON.stringify(chat));
      this.http.post(apiURL, JSON.stringify(chat), options).toPromise().then(
        res => {
          resolve(JSON.stringify(res.json()));
        },
        msg => {
          reject(msg);
          console.log("Chat error: " + msg);
        }
      );
    });
  }

  getConversation(toUsername: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let fromUsername: string = this.userService.getCurrentUser().username;
      let apiURL = `http://localhost:8080/chat/getAllChatsBetweenTwoUsernames?fromUsername=${fromUsername}&toUsername=${toUsername}`;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiURL, '', headers).toPromise().then(
        res => {
          resolve(JSON.stringify(res.json()));
        },
        msg => {
          reject(msg);
          console.log("getConversation error: " + msg);
        }
      );
    });
    return promise;
  }
}
