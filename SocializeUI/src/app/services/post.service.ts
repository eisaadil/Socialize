import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Router} from "@angular/router";
import "rxjs/Rx";
import {Post} from "../models/post.model";
import {UserService} from "./user.service";

@Injectable()
export class PostService {
  constructor(public http: Http, public router: Router, public userService: UserService) {
  }

  createPost(postText: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiURL = `http://localhost:8080/post/createPost`;
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      let post: Post = new Post(postText, this.userService.getCurrentUser());
      console.log("stringified in service " + JSON.stringify(post));
      this.http.post(apiURL, JSON.stringify(post), options).toPromise().then(
        res => {
          resolve(JSON.stringify(res.json()));
        },
        msg => {
          reject(msg);
          console.log("Auth error: " + msg);
        }
      );
    });
  }

  getAllPosts(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `http://localhost:8080/post/getAllPosts`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiURL, '', headers).toPromise().then(
        res => {
          resolve(JSON.stringify(res.json()));
        },
        msg => {
          reject(msg);
          console.log("getUserFromId error: " + msg);
        }
      );
    });
    return promise;
  }

  getAllPostsFromId(id: number): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `http://localhost:8080/post/getAllPostsForUserId`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiURL + `?id=${id}`, '', headers).toPromise().then(
        res => {
          resolve(JSON.stringify(res.json()));
        },
        msg => {
          reject(msg);
          console.log("getUserFromId error: " + msg);
        }
      );
    });
    return promise;
  }

  deletePost(id: number): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `http://localhost:8080/post/deletePostFromId`;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiURL + `?id=${id}`, '', headers).toPromise().then(
        res => {
          resolve(JSON.stringify(res.json()));
        },
        msg => {
          reject(msg);
          console.log("Auth error: " + msg);
        }
      );
    });
    return promise;
  }
}
