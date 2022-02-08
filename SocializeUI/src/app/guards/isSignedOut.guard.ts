import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";

@Injectable()
export class IsSignedOutGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    if (localStorage.getItem('currentUser') === null) {
      console.log("Item not prsent");
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/home']);
    return false;
  }
}
