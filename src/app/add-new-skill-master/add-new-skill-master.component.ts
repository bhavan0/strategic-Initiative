import { Component, OnInit } from '@angular/core';
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
  selector: 'app-add-new-skill-master',
  templateUrl: './add-new-skill-master.component.html',
  styleUrls: ['./add-new-skill-master.component.css']
})
export class AddNewSkillMasterComponent implements OnInit {
  LoggedInUserName: string;
  selectedCategory: string;
  selectedSkill: String;
  isAdminUser:any;
  CategoryArray = [];
  constructor(private httpClient: HttpClient, private router: Router,
    private ButtonModule: ButtonModule,
    private confirmationService: ConfirmationService, private authenticationServiceService: AuthenticationServiceService, private apiService: ApiService) {
    this.apiService.updateHeader();
  }
  SetSelectedCategory(Category) 
  { 
    this.selectedCategory = Category;
  }
  onBlurCategory(Skill) { this.selectedSkill = Skill }
  AddSkill() {
    var isvalidated = true;

    if (this.selectedCategory == undefined) {
      isvalidated = false;
      this.confirmationService.confirm({
        message: 'Please Select Category Value',
        accept: () => {
        }
      });
    }
    if (isvalidated && this.selectedSkill == undefined) {
      isvalidated = false;
      this.confirmationService.confirm({
        message: 'Please Enter Skill Value',
        accept: () => {
        }
      });
    }
    if (isvalidated) {
      this.apiService.checkIfSkillAlreadyExistsForCategory(this.selectedCategory, this.selectedSkill)
        .subscribe(
          (id) => {
            console.log("Category Count=" + id);
            if (id > 0) {
              isvalidated = false;
              this.confirmationService.confirm({
                message: 'The Selected Skill for this Category already Exist in Expert Database System',
                accept: () => {
                }
              });
              isvalidated = false;
              this.InsertSkill(isvalidated);
            }
            else { this.InsertSkill(isvalidated); }
          },
          error => console.log('oops', error)
        );
    }
  }

  InsertSkill(isvalidated) {
    if (isvalidated && this.selectedCategory != undefined && this.selectedSkill != undefined) {
      this.apiService.addSkillToCategory(this.selectedCategory, this.selectedSkill)
        .subscribe(
          (id) => {
            this.router.navigate(["../SkillMaster"])
          },
          error => console.log('oops', error)
        );
    }
  }

  ngOnInit() {
    this.isAdminUser = sessionStorage["IsAdminUser"];
    this.apiService.getCategoryList()
      .subscribe(
        (CategoryList: CategoryObj[]) => {
          this.CategoryArray = CategoryList.map(x =>
            ({ label: x.CategoryName, value: x.CategoryID }));
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
