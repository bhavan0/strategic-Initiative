import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ApiService } from '../service/api.service';



@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [ConfirmationService]
})
export class CategoryListComponent implements OnInit {

  LoggedInUserName: string;
  CategoryArray: CategoryObj[] = [];
  isAdminUser:any;

  constructor(private router: Router,
    private confirmationService: ConfirmationService,
    private authenticationServiceService: AuthenticationServiceService,private apiService:ApiService) {
      this.apiService.updateHeader();
  }

  ValidateDeleteCategory(ID) {
    var isvalidated = true;
    if (isvalidated) {
     this.apiService.checkIfCategoryCanBeDeleted(ID)
        .subscribe(
          (id) => {
            console.log("Category Count=" + id);
            if (id > 0) {
              isvalidated = false;
              this.confirmationService.confirm({
                message: 'User Assessments are already Associated with Category , We Can not Delete it',
                accept: () => {
                }
              });
              isvalidated = false;
              this.DeleteCategory(isvalidated, ID);
            }
            else { this.DeleteCategory(isvalidated, ID); }
          },
          error => console.log('oops', error)
        );
    }
  }
  DeleteCategory(isvalidated, ID) {
    if (isvalidated) {
      this.confirmationService.confirm({
        //message: 'Are you sure that you want to perform this action?',
        message: 'Do you Want to Delete the Category',
        accept: () => {
         this.apiService.deleteCategory(ID)
            .subscribe(
              (data: string) => {
                console.log("ID=" + ID);
                console.log(data);
                this.ngOnInit();
              },
              error => console.log('oops', error)
            );
        }
      });
    }
  }


  EditCategory(ID) {
    console.log("the id issssssss " +ID)
    this.router.navigate(["../EditCategory/" + ID])
  }

  ngOnInit() {
    this.isAdminUser = sessionStorage["IsAdminUser"];
    this.apiService.getCategoryMasterList()
      .subscribe(
        (CategoryList: CategoryObj[]) => {
          this.CategoryArray = CategoryList;
          console.log('CategoryList=' + CategoryList);
        },
        error => console.log('oops', error)
      );
  }




}
export class CategoryObj {
  CategoryID: Int32Array;
  CategoryName: string;
}
