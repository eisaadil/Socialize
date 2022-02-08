import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {UserService} from "./services/user.service";
import {PostService} from "./services/post.service";
import {HttpModule} from "@angular/http";
import {AuthGuard} from "./guards/auth.guard";
import {UsernameValidator} from "./validators/UsernameValidator";
import {IsSignedOutGuard} from "./guards/isSignedOut.guard";
import {IndexComponent} from "./components/index/index.component";
import {HeaderComponent} from "./components/header/header.component";
import {DropdownDirective} from "./directives/dropdown.directive";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileDetailsComponent} from "./components/profile-details/profile-details.component";
import {ProfileDeactivateComponent} from "./components/profile-deactivate/profile-deactivate.component";
import {PostComponent} from "./components/post/post.component";
import {DisplayPostsComponent} from "./components/display-posts/display-posts.component";
import {NewPostComponent} from "./components/new-post/new-post.component";

import {StompService} from "ng2-stomp-service";
import {ChatComponent} from "./components/chat/chat.component";
import {DisplayChatsComponent} from "./components/display-chats/display-chats.component";
import {MessagingComponent} from "./components/messaging/messaging.component";
import {NewChatComponent} from "./components/new-chat/new-chat.component";
import {ChatService} from "./services/chat.service";
import {Ng2CompleterModule} from "ng2-completer";
import {FindPeopleComponent} from "./components/find-people/find-people.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    IndexComponent,
    HeaderComponent,
    DropdownDirective,
    ProfileComponent,
    ProfileDetailsComponent,
    ProfileDeactivateComponent,
    PostComponent,
    DisplayPostsComponent,
    NewPostComponent,
    ChatComponent,
    DisplayChatsComponent,
    MessagingComponent,
    NewChatComponent,
    FindPeopleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'index', component: IndexComponent, canActivate: [IsSignedOutGuard]},
      {
        path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
        {path: 'details', component: ProfileDetailsComponent},
        {path: 'edit', component: SignUpComponent},
        {path: 'deactivate', component: ProfileDeactivateComponent},
        {path: '', redirectTo: 'details', pathMatch: 'full'}
      ]
      },
      {
        path: 'chat/:username', component: MessagingComponent, canActivate: [AuthGuard]/*, children:[
       {path:':username', component: MessagingComponent},
       {path:'', component: MessagingComponent, pathMatch: 'full'}
       ]*/
      },
      {path: 'chat', component: MessagingComponent, canActivate: [AuthGuard]},
      {path: 'find-people/:username', component: FindPeopleComponent, canActivate: [AuthGuard]},
      {path: 'find-people', component: FindPeopleComponent, canActivate: [AuthGuard]},

      {path: '**', redirectTo: 'home'}]),
    ReactiveFormsModule,
    HttpModule,
    Ng2CompleterModule
  ],
  providers: [UserService, AuthGuard, UsernameValidator, IsSignedOutGuard, PostService, StompService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
