import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {UserService} from "../../services/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post.model";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'sc-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public loading: boolean = false;
  public postForm = this.fb.group({
    text: ["", [Validators.minLength(10), Validators.required]]
  });
  public newPost: Post;


  /* ERROR CODE: 0 -- No error,  1 -- Wrong Credentials, 2 -- Server Error */
  public errorCode: number = -1; //-1 is no error
  @Output() public postCompleteEvent: EventEmitter<boolean> = new EventEmitter();


  constructor(public fb: FormBuilder, public userService: UserService, public postService: PostService) {
  }

  ngOnInit() {
  }

  postFormSubmit() {
    if (!this.postForm.valid) return;
    this.loading = true;
    //let formData = this.chatForm.value;

    let postText = this.postForm.controls.text.value;
    this.postService.createPost(postText).then((res) => {
      let responseJSON = JSON.parse(res.toString());
      let isPostSuccessful: boolean = false;
      if (responseJSON.status == 1) isPostSuccessful = true;

      this.loading = false;

      if (isPostSuccessful) {
        this.errorCode = 0;
        this.newPost = responseJSON.data;
        this.postForm.reset();
        this.postCompleteEvent.emit(true);

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
