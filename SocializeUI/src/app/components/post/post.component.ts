import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Post} from "../../models/post.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'sc-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  userPost: User;

  errorCode: number = 0;
  loading: boolean;
  isCurrentUser: boolean = false;

  @Output() public deleteCodeEvent: EventEmitter<number> = new EventEmitter();


  constructor(public userService: UserService, public postService: PostService) {
  }

  ngOnInit() {
    this.userPost = this.post.user;
    if (this.userPost.id == this.userService.getCurrentUser().id) this.isCurrentUser = true;
    /*
    this.userService.getUserFromId(this.post.userId).then((res) => {
      let responseJSON = JSON.parse(res.toString());
      let isUserFetched: boolean = false;
      if (responseJSON.status == 1) isUserFetched = true;

      this.loading = false;

      if (isUserFetched) {
        this.errorCode = 0;
        this.userPost = responseJSON.data;
        if (this.userPost.id == this.userService.getCurrentUser().id) this.isCurrentUser = true;
      }
      else {
        this.errorCode = 1;
      }
      this.loading = false;
    }).catch((res) => {
      this.errorCode = 2;
      this.loading = false;
     });*/
    this.deleteCodeEvent.emit(-1);
  }

  removePost(postId: number) {
    this.loading = true;
    this.postService.deletePost(postId).then((res) => {
      let status = JSON.parse(res.toString()).status;
      this.loading = false;
      if (status == 1) {
        this.deleteCodeEvent.emit(0);
      }
      else {
        this.deleteCodeEvent.emit(1);
      }
    }).catch((res) => {
      this.deleteCodeEvent.emit(2);
      this.loading = false;
    });

  }

}
