import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


let headers = new HttpHeaders();
@Injectable({
      providedIn: 'root'
})

export class AuthenticationServiceService {
      public LoggedInPUID: string;
      BreadCrumbText: string;
      public puidInformer: BehaviorSubject<string> = new BehaviorSubject<string>(null);
      constructor(private httpClient: HttpClient) {
      }
      ngOnInit() {
            sessionStorage["BreadCrumb"] = "";
      }


      //headers = headers.set('Content-Type', 'application/json; charset=utf-8;Access-Control-Allow-Credentials,true');

      UpdateBreadCrumb(CurrentPage) {

            //<a href="https://www.w3schools.com">Visit W3Schools.com!</a>   
            if (CurrentPage == "SelfAssessment")
                  this.BreadCrumbText = "Expert Database >> Self Assessment";
            else if (CurrentPage == "ExpertSearch")
                  this.BreadCrumbText = "Expert Database >> Expert Search";
            else if (CurrentPage == "AddNewAssessment")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Add New Skill";
            else if (CurrentPage == "EditAssessment")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Edit Assessment";
            else if (CurrentPage == "CategoryMaster")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Category Master";
            else if (CurrentPage == "AddNewCategory")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Category Master >> Add New Category";
            else if (CurrentPage == "EditCategory")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Category Master >> Edit Category";
            else if (CurrentPage == "SkillMaster")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Skill Master";
            else if (CurrentPage == "AddNewSkillMaster")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Skill Master >> Add New Skill Master";
            else if (CurrentPage == "EditSkillMaster")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Skill Master >> Edit Skill Master";
            else if (CurrentPage == "AddNewSkill")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Add New Skill";
            else if (CurrentPage == "EditSkill")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Edit Skill";
            else if (CurrentPage == "UploadUsers")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Upload Users";
            else if (CurrentPage == "Users")
                  this.BreadCrumbText = "Expert Database >> Self Assessment >> Users List";


            return this.BreadCrumbText;
      }

      RerouteBasesOnBreadCrumb(breadCrumbValue) {
            var temp: string;
            if (breadCrumbValue == "Expert Database ")
                  temp = "SelfAssessment";
            if (breadCrumbValue == " Self Assessment " || breadCrumbValue == " Self Assessment")
                  temp = "SelfAssessment";
            else if (breadCrumbValue == " Expert Search")
                  temp = "ExpertSearch";
            else if (breadCrumbValue == " Add New Skill")
                  temp = "AddNewSkill";
            else if (breadCrumbValue == " Edit Assessment")
                  temp = "EditAssessment";
            else if (breadCrumbValue == " Category Master" || breadCrumbValue == " Category Master ")
                  temp = "CategoryMaster";
            else if (breadCrumbValue == " Add New Category")
                  temp = "AddNewCategory";
            else if (breadCrumbValue == " Edit Category")
                  temp = "EditCategory";
            else if (breadCrumbValue == " Skill Master" || breadCrumbValue == " Skill Master ")
                  temp = "SkillMaster";
            else if (breadCrumbValue == " Edit Skill")
                  temp = "EditSkill";
            else if (breadCrumbValue == " Upload Users")
                  temp = "UploadUsers";
            else if (breadCrumbValue == " Users List")
                  temp = "Users";
            return temp;
      }
      GetUser() {
            this.puidInformer = new BehaviorSubject<string>(null);
            this.httpClient
                  .get("http://in01sqvd204:40000/api/UserAutentication")
                  .subscribe(
                        (UserName: string) => {
                              this.LoggedInPUID = UserName;
                              sessionStorage["PUID"] = UserName;
                              localStorage["PUID1"] = UserName;
                              console.log("PUID=" + this.LoggedInPUID);
                              this.puidInformer.next(this.LoggedInPUID);
                        },
                        error => console.log('oops', error)
                  );
            return this.puidInformer.asObservable();
      }

}

