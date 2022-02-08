import {ChangeDetectorRef, Component, HostBinding} from "@angular/core";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private cdRef: ChangeDetectorRef) {
  }

  // alternatively also the host parameter in the @Component()` decorator can be used
  @HostBinding('class.alert') someField = false;

  ngOnInit() {
    this.someField = true; // set class `someClass` on `<body>`
    //this.cdRef.detectChanges();
  }
}
