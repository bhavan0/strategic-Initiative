import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/authentication-service.service';
import { ApiService } from '../service/api.service';
import { checkAndUpdatePureExpressionDynamic } from '@angular/core/src/view/pure_expression';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  LoggedInUserName: string;
  LastupdateTime: string;
  CurrentComponent: string;
  msgbreadcrumb: string = "";
  breadCrumbList: string[];
  UserPUID: any;
  isInSelfAssessmentPage: any;

  constructor(private authenticationServiceService: AuthenticationServiceService, private apiService: ApiService, private router: Router) {
    this.apiService.invokeEvent.subscribe(value => {
      if (value === 'someValue') {
        this.ngOnInit();
      }
    })
  }

  getBreadCrumb(temp) {
    var route = this.authenticationServiceService.RerouteBasesOnBreadCrumb(temp)
    this.router.navigate(["../" + route])
  }

  ngOnInit() {
    this.CurrentComponent = this.router.url.split("/", 2)[1];

    this.msgbreadcrumb = this.authenticationServiceService.UpdateBreadCrumb(this.CurrentComponent);

    if (this.msgbreadcrumb != undefined) {
      this.breadCrumbList = this.msgbreadcrumb.split(">>");
      this.isInSelfAssessmentPage = false;
      if (this.breadCrumbList[1].indexOf("Self") == 1)
        this.isInSelfAssessmentPage = true;
    }
    this.authenticationServiceService.GetUser().subscribe(
      data => {
        if (data) {
          this.UserPUID = this.authenticationServiceService.LoggedInPUID;
        }

        this.apiService.getUserName()
          .subscribe(
            (UserName: string) => {
              this.LoggedInUserName = UserName;
              console.log("User Name=" + UserName);
              sessionStorage["UserName"] = UserName;
            },
            error => console.log('oops', error)
          );

        this.apiService.getLastUpdate()
          .subscribe(
            (LastupdateTime: string) => {
              this.LastupdateTime = LastupdateTime;
            },
            error => console.log('oops', error));
      }
    );
  }
}
