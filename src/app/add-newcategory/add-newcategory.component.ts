import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { ApiService } from '../service/api.service';






@Component({
  selector: 'app-add-newcategory',
  templateUrl: './add-newcategory.component.html',
  styleUrls: ['./add-newcategory.component.css'],
  providers: [ConfirmationService]
})
export class AddNewcategoryComponent implements OnInit {
  CategoryName: string;
  LoggedInUserName: string;
  isAdminUser:any;
  
  onBlurCategory(CategoryName) { this.CategoryName = CategoryName; }
  constructor(private httpClient: HttpClient, private router: Router,
    private ButtonModule: ButtonModule,
    private confirmationService: ConfirmationService,
    private authenticationServiceService: AuthenticationServiceService,private apiService:ApiService) { 
      this.apiService.updateHeader();
    }
  AddCategory() {
    var isvalidated = true;

    if (this.CategoryName == undefined) {
      isvalidated = false;
      this.confirmationService.confirm({
        message: 'Please Enter Category Value',
        accept: () => {
        }
      });
    }

    if (isvalidated) {
      this.apiService.checkIfCategoryAlreadyExists(this.CategoryName)
        .subscribe(
          (id) => {
            console.log("Category Count=" + id);
            if (id > 0) {
              isvalidated = false;
              this.confirmationService.confirm({
                message: 'This Category already exist in system',
                accept: () => {
                }
              });
              isvalidated = false;
              this.InsertCategory(isvalidated);
            }
            else { this.InsertCategory(isvalidated); }
          },
          error => console.log('oops', error)
        );
    }
  }
  InsertCategory(isvalidated) {
    if (isvalidated && this.CategoryName != undefined) {

      this.apiService.addCategoryToList(this.CategoryName)
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
  }

}
