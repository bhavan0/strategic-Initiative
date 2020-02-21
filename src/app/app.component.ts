import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'AngExpertDatabaseSA';

  // recordCount: number;
  // UserAssessmentID: Int32Array;
  // Category: string;
  // Skill: string;
  // ProficiencyLevel: string;
  // LoggedInUserName:string;
  // CategoryID: Int32Array;
  // CategoryName: string;

  // myAssessement: myAssessementObj[] = [];
  // CategoryArray: CategoryObj[] = [];
  constructor(private httpClient: HttpClient) {
  }
 
  ngOnInit() {
    /*this.httpClient
      .get("http://IN01SQVD204:40000/api/GetAllAssessments")
      .subscribe(
        (data: myAssessementObj[]) => {
          this.myAssessement = data;
          console.log(data);
        },
        error => console.log('oops', error)
      );
      this.httpClient
      .get("http://IN01SQVD204:40000/api/GetCategoryList")
      .subscribe(
        (CategoryList: CategoryObj[]) => {
          this.CategoryArray = CategoryList;
          console.log(CategoryList);
        },
        error => console.log('oops', error)
      );
      this.httpClient
      .get("http://IN01SQVD204:40000/api/Getusername")
      .subscribe(
        (UserName: string) => {
          this.LoggedInUserName = UserName;
          console.log("User Name=" + UserName);
        },
        error => console.log('oops', error)
      );*/
      
  }
}
/*
export class CategoryObj {
  CategoryID: Int32Array;
  CategoryName: string;
 }
export class myAssessementObj {
  UserAssessmentID: Int32Array;
  Category: string;
  Skill: string;
  ProficiencyLevel: string;
}*/
