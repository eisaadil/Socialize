import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {PostService} from "../../services/post.service";
import {CompleterItem} from "../../directives/completer-item.interface";

@Component({
  selector: 'sc-find-people',
  templateUrl: './find-people.component.html',
  styleUrls: ['./find-people.component.css']
})
export class FindPeopleComponent implements OnInit {

  constructor(public userService: UserService, public router: Router, public route: ActivatedRoute, public postService: PostService) {
  }

  selectedUser: User;
  postsList: User;
  loading: boolean;
  errorCode: number;
  postErrorCode: number;
  selectedMode: string = "profile";


  public userList: User[];
  public usernameList: string[];

  ngOnInit() {
    if (!this.route.snapshot.paramMap.get('username')) {
      this.selectedMode = "";
      this.getAllUsers();
    }
    this.route.params.subscribe(params => {
      this.getUserFromUsername(params['username']);
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
        if (this.selectedUser.username == this.userService.getCurrentUser().username) this.router.navigate(['profile']);
        this.getAllPostsFromId(this.selectedUser.id);
      }
      else {
        this.router.navigate(['find-people']);
        this.errorCode = 1;
      }
      this.loading = false;
    }).catch((res) => {
      this.errorCode = 2;
      this.loading = false;
    });
  }

  getAllPostsFromId(id: number) {
    this.postService.getAllPostsFromId(id).then((res) => {
      let responseJSON = JSON.parse(res.toString());
      let isPostListFetched: boolean = false;
      if (responseJSON.status == 1) isPostListFetched = true;

      this.loading = false;

      if (isPostListFetched) {
        this.postErrorCode = 0;
        this.postsList = responseJSON.data;
      }
      else {
        this.postErrorCode = 1;
      }
      this.loading = false;
    }).catch((res) => {
      this.postErrorCode = 2;
      this.loading = false;
    });
  }

  userSelected(s: CompleterItem) {
    this.router.navigate(['find-people', s.title.substr(0, s.title.indexOf(' '))]);
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
        this.usernameList = this.userList.map(function (a) {
          return a.username + ' | ' + a.fullName + ' | ' + a.email + ' | ' + a.id;
        });
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

}
