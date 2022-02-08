import {Component, Input, OnInit} from "@angular/core";
import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'sc-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css']
})
export class DisplayPostsComponent implements OnInit {

  @Input() postsList: Post[];
  loading: boolean;
  errorCode: number = -1;
  deleteErrorCode = -1;

  constructor(public postService: PostService) {
  }

  ngOnInit() {
    if (!this.postsList) {
      this.getAllPosts();
    }
  }

  getAllPosts() {
    this.postService.getAllPosts().then((res) => {
      let responseJSON = JSON.parse(res.toString());
      let isPostListFetched: boolean = false;
      if (responseJSON.status == 1) isPostListFetched = true;

      this.loading = false;

      if (isPostListFetched) {
        this.errorCode = 0;
        this.postsList = responseJSON.data;
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

  deletePost(postId) {
    if (postId != -1) {
      console.log("in disp component" + postId);
      this.deleteErrorCode = postId;
      this.reloadList(true);
      let numbers = Observable.timer(4000);
      numbers.subscribe(x => {
        this.deleteErrorCode = -1;
      });
    }

  }

  reloadList(event: boolean) {
    console.log("here reloading list");
    if (event)
      this.getAllPosts();
  }

}
