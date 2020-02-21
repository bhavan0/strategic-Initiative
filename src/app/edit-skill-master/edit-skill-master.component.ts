import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ButtonModule } from 'primeng/button';
import { request } from 'http';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-edit-skill-master',
  templateUrl: './edit-skill-master.component.html',
  styleUrls: ['./edit-skill-master.component.css']
})
export class EditSkillMasterComponent implements OnInit {
  LoggedInUserName: string;
  SkillArray: SkillObj[] = [];
  CategoryName: string;
  SkillName: string;
  CategoryArray: any;
  SkillID: any;
  UpdatedSkillName: any;
  IsSkillModified=false;
  CategoryID: any;
  isAdminUser:any;
  constructor(private httpClient: HttpClient, private router: Router,
    private ButtonModule: ButtonModule,
    private confirmationService: ConfirmationService, private activatedRoute: ActivatedRoute,
    private authenticationServiceService: AuthenticationServiceService,private apiService:ApiService) {
    let id = this.activatedRoute.snapshot.params["ID"];
    this.SkillID = id;
    this.apiService.updateHeader();
  }
  onBlurSkill(Skill) 
  { 
    this.UpdatedSkillName = Skill; 
    this.IsSkillModified = true;
  }
 
  EditSkill() {
    var isvalidated = true;
    
    if(this.IsSkillModified){
    
    if (this.UpdatedSkillName == undefined || this.UpdatedSkillName == "") {
      isvalidated = false;
      this.confirmationService.confirm({
        message: 'Please Enter the Skill',
        accept: () => {
        }
      });
    }

    if (isvalidated) {
        this.apiService.checkIfSkillAlreadyExistsForCategory(this.CategoryID,this.UpdatedSkillName)
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
              this.EditSkillINDB(isvalidated);
            }
            else { this.EditSkillINDB(isvalidated); }
          },
          error => console.log('oops', error)
        );
    }
  }else{this.router.navigate(["../SkillMaster"])}
  }
  EditSkillINDB(isvalidated) {
    if (isvalidated) {
      this.apiService.updateSkill(this.SkillID,this.UpdatedSkillName)
        .subscribe(
          (id) => {
            //alert(id);      
            this.router.navigate(["../SkillMaster"])
          },
          error => console.log('oops', error)
        );
    }
  }
  ngAfterViewInit() {
   this.apiService.getCategoryList()
      .subscribe(
        (CategoryList: SkillObj[]) => {
          this.CategoryArray = CategoryList.map(x =>
            ({ label: x.CategoryName, value: x.SkillID }));
        },
        error => console.log('oops', error)
      );

   this.apiService.getSkillById(this.SkillID)
      .subscribe(
        (SkillList: SkillObj[]) => {
          this.SkillArray = SkillList;
          this.CategoryID = this.SkillArray[0].CategoryID;
          this.CategoryName = this.SkillArray[0].CategoryName;
          this.SkillName = this.SkillArray[0].SkillName;

          console.log("this.CategoryName=" + this.CategoryName);
        },
        error => console.log('oops', error)
      );

  }
  ngOnInit() {
    this.isAdminUser = sessionStorage["IsAdminUser"];

    this.apiService.getSkillById(this.SkillID)
      .subscribe(
        (SkillList: SkillObj[]) => {
          this.SkillArray = SkillList;
          this.CategoryName = this.SkillArray[0].CategoryName;
          this.CategoryID = this.SkillArray[0].CategoryID;
          console.log("this.CategoryName=" + this.CategoryName);
        },
        error => console.log('oops', error)
      );

    
    
  }

}
export class SkillObj {
  SkillID: Int32Array;
  CategoryID: Int32Array;
  CategoryName: string;
  SkillName: string;
}
