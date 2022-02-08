import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Router} from "@angular/router";
import "rxjs/Rx";
import {User} from "../models/user.model";

@Injectable()
export class UserService {
  currentUser: User;
  //result: string;
  constructor(public http: Http, public router: Router) {
  }

  signIn(username: string, password: string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `http://localhost:8080/user/auth`;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      //JSON.stringify({username: username, password: password})
      this.http.post(apiURL + `?username=${username}&password=${password}`, '', headers).toPromise().then(
        res => {
          // console.log("Auth success: "+res.json().status);
          // console.log("Data: "+ JSON.stringify(res.json().data));
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

  signUp(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiURL = "";
      if (!this.isLoggedIn()) {
        apiURL = `http://localhost:8080/user/createUser`;
      }
      else {
        apiURL = `http://localhost:8080/user/updateUserFromId`;
        user.id = this.getCurrentUser().id;
      }
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      console.log("stringified in service " + JSON.stringify(user));
      this.http.post(apiURL, JSON.stringify(user), options).toPromise().then(
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

  isUsernameAvailable(username: string) {
    let apiURL = `http://localhost:8080/user/checkUsernameAvailable`;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(apiURL + `?username=${username}`, '', headers).map(res => res.json());
  }

  getCurrentUser(): User {
    if (localStorage.getItem('currentUser'))
      return JSON.parse(localStorage.getItem("currentUser"));
    return null;
  }

  getUserFromId(id: number): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `http://localhost:8080/user/getUserFromId`;
      var headers = new Headers();
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

  getUserFromUsername(username: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `http://localhost:8080/user/getUserFromUsername`;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiURL + `?username=${username}`, '', headers).toPromise().then(
        res => {
          resolve(JSON.stringify(res.json()));
        },
        msg => {
          reject(msg);
          console.log("getUserFromUsername error: " + msg);
        }
      );
    });
    return promise;
  }

  deactivateAccount(): Promise<any> {
    let id: number = this.getCurrentUser().id;
    let promise = new Promise((resolve, reject) => {
      let apiURL = `http://localhost:8080/user/deleteUser`;
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

  isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser'))
      return true;
    return false;
  }

  signOut(): void {
    console.log("signed out");
    this.router.navigate(['/index']);
    localStorage.removeItem('currentUser');
  }

  getAllUsers(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `http://localhost:8080/user/getAllUsers`;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiURL, '', headers).toPromise().then(
        res => {
          resolve(JSON.stringify(res.json()));
        },
        msg => {
          reject(msg);
          console.log("getAllUsers error: " + msg);
        }
      );
    });
    return promise;
  }
}
