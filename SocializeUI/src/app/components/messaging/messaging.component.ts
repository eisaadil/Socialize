import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'sc-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  userList: User[];
  loading: boolean;
  errorCode: number;
  selectedUser: User;

  constructor(public userService: UserService, public router: Router, public route: ActivatedRoute) {
  }

  alert(x) {
    alert(x);
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('username')) this.fetchChatsFor(this.route.snapshot.paramMap.get('username'));
    this.getAllUsers();

  }

  getAllUsers() {
    this.userService.getAllUsers().then((res) => {
      let responseJSON = JSON.parse(res.toString());
      let isUserListFetched: boolean = false;
      if (responseJSON.status == 1) isUserListFetched = true;

      this.loading = false;

      if (isUserListFetched) {
        this.errorCode = 0;
        this.userList = responseJSON.data;
        this.userList = this.userList.filter(user => !(new Set([this.userService.getCurrentUser().id])).has(user.id));
        let usernameParam: string = this.route.snapshot.paramMap.get('username');
        if (usernameParam != null && usernameParam != "") this.getUserFromUsername(usernameParam);
        else this.selectedUser = this.userList[0];
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

  getUserFromUsername(username: string) {
    this.userService.getUserFromUsername(username).then((res) => {
      let responseJSON = JSON.parse(res.toString());
      let isUserFetched: boolean = false;
      if (responseJSON.status == 1) isUserFetched = true;

      this.loading = false;

      if (isUserFetched) {
        this.selectedUser = responseJSON.data;
      }
      else {
        this.selectedUser = this.userList[0];
      }
      this.loading = false;
    }).catch((res) => {
      this.errorCode = 2;
      this.loading = false;
    });
  }

  fetchChatsFor(username: string) {
    console.log("fetchChatsFor" + username);
    this.router.navigate(['/chat/' + username]);
    this.route.params.subscribe(params => {
      this.getUserFromUsername(params['username']);
      this.getAllUsers(); // based on new parameter this time
    });
  }

}
