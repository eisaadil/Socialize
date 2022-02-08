import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {ChatService} from "../../services/chat.service";
import {UserService} from "../../services/user.service";
import {Chat} from "../../models/chat.model";
import {Observable} from "rxjs/Observable";
import {User} from "../../models/user.model";

@Component({
  selector: 'sc-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit {

  public loading: boolean = false;
  public chatForm = this.fb.group({
    text: ["", [Validators.minLength(5), Validators.required]]
  });
  public newChat: Chat;
  @Input() public toUser: User;

  /* ERROR CODE: 0 -- No error,  1 -- Wrong Credentials, 2 -- Server Error */
  public errorCode: number = -1; //-1 is no error

  constructor(public fb: FormBuilder, public userService: UserService, public chatService: ChatService) {
  }

  ngOnInit() {
  }

  chatFormSubmit() {
    if (!this.chatForm.valid) return;
    this.loading = true;
    //let formData = this.chatForm.value;

    let chatText = this.chatForm.controls.text.value;
    this.chatService.createChat(chatText, this.toUser).then((res) => {
      let responseJSON = JSON.parse(res.toString());
      let isPostSuccessful: boolean = false;
      if (responseJSON.status == 1) isPostSuccessful = true;

      this.loading = false;

      if (isPostSuccessful) {
        this.errorCode = 0;
        this.newChat = responseJSON.data;
        this.chatForm.reset();
      }
      else {
        this.errorCode = 1;
      }
      this.loading = false;
    }).catch((res) => {
      this.errorCode = 2;
      this.loading = false;
    });
    let numbers = Observable.timer(5000); // Call after 10 second.. Please set your time
    numbers.subscribe(x => {
      this.errorCode = -1;
    });

  }

}
