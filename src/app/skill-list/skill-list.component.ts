import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { PaginatorModule } from 'primeng/paginator';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {
  LoggedInUserName: string;
  SkillArray: SkillObj[] = [];
  isAdminUser:any;
  constructor(private router: Router,
    private confirmationService: ConfirmationService, private authenticationServiceService: AuthenticationServiceService,private apiService:ApiService) {
      this.apiService.updateHeader();
  }

  EditSkill(ID) {
    this.router.navigate(["../../EditSkillMaster/" + ID])
  }
  ValidateDeleteSkill(ID) {
    var isvalidated = true;
    if (isvalidated) {
     this.apiService.checkIfSkillCanBeDeleted(ID)
        .subscribe(
          (id) => {
            console.log("Category Count=" + id);
            if (id > 0) {
              isvalidated = false;
              this.confirmationService.confirm({
                message: 'User Assessments are already Associated with Skill , We Can not Delete it',
                accept: () => {
                }
              });
              isvalidated = false;
              this.DeleteSkill(isvalidated, ID);
            }
            else { this.DeleteSkill(isvalidated, ID); }
          },
          error => console.log('oops', error)
        );
    }
  }
  DeleteSkill(isvalidated, ID) {
    if (isvalidated) {
      this.confirmationService.confirm({
        message: 'Do you Want to Delete the Skill',
        accept: () => {
          this.apiService.deleteSkill(ID)
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
  ngOnInit() {
    this.isAdminUser = sessionStorage["IsAdminUser"];

    this.apiService.getSkillMasterList()
      .subscribe(
        (SkillList: SkillObj[]) => {
          this.SkillArray = SkillList;
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
