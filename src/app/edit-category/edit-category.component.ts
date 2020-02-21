import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { request } from 'http';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { ApiService } from '../service/api.service';




@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  LoggedInUserName: string;
  CategoryID: any;
  CategoryName: string;
  UpdatedCategoryName: string;
  IsCategoryModified = false;
  isAdminUser: any;

  constructor(private httpClient: HttpClient, private router: Router,
    private confirmationService: ConfirmationService, private activatedRoute: ActivatedRoute,
    private authenticationServiceService: AuthenticationServiceService, private apiService: ApiService) {
    this.apiService.updateHeader();
    let id = this.activatedRoute.snapshot.params["ID"];
    this.CategoryID = id;
  }
  onBlurCategory(CategoryName) {
    this.UpdatedCategoryName = CategoryName;
    this.IsCategoryModified = true;
  }

  EditCategory() {
    var isvalidated = true;

    if (this.IsCategoryModified == false) {
      isvalidated = false;
      this.confirmationService.confirm({
        message: 'Category not updated! Update Category and “Submit” if no changes Required, click “Cancel”',
        accept: () => {
        }
      });
    }
    if (isvalidated) {
      if (this.UpdatedCategoryName == undefined || this.UpdatedCategoryName == "") {
        isvalidated = false;
        this.confirmationService.confirm({
          message: 'Please enter skill Category',
          accept: () => {
          }
        });
      }
    }
    if (isvalidated) {

      this.apiService.checkIfCategoryAlreadyExists(this.UpdatedCategoryName)
        .subscribe(
          (id) => {
            console.log("Category Count=" + id);
            if (id > 0) {
              isvalidated = false;
              this.confirmationService.confirm({
                message: 'The Selected Category already Exist in Expert Database System',
                accept: () => {
                }
              });
              isvalidated = false;
              this.EditDBCategory(isvalidated);
            }
            else { this.EditDBCategory(isvalidated); }
          },
          error => console.log('oops', error)
        );
    }

  }

  EditDBCategory(isvalidated) {
    if (isvalidated && this.CategoryName != undefined) {

      this.apiService.updateCategory(this.CategoryID, this.UpdatedCategoryName)
        .subscribe(
          (id) => {
            this.router.navigate(["../CategoryMaster"])
          },
          error => console.log('oops', error)
        );
    }

  }


  ngOnInit() {
    this.isAdminUser = sessionStorage["IsAdminUser"];
    this.apiService.getCategory(this.CategoryID)
      .subscribe(
        (CategoryName: string) => {
          this.CategoryName = CategoryName;
          console.log("this.CategoryName=" + CategoryName);
        },
        error => console.log('oops', error)
      );



  }

}
export class SkillObj {
  SkillID: Int32Array;
  CategoryName: string;
  SkillName: string;
}
