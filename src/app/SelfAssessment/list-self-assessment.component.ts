import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ApiService } from '../service/api.service';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-list-self-assessment',
  templateUrl: './list-self-assessment.component.html',
  styleUrls: ['./list-self-assessment.component.css'],
  providers: [ConfirmationService]
})


export class ListSelfAssessmentComponent implements OnInit {

  title = 'AngExpertDatabaseSA';
  recordCount: number;
  UserAssessmentID: Int32Array;
  Category: string;
  Skill: string;
  ProficiencyLevel: string;

  data: any;
  ProficiencyLevelArray: any;
  isAdminUser: any;
  UserPUID: any;
  UserID: string;
  myAssessement: myAssessementObj[] = [];

  constructor(private confirmationService: ConfirmationService,
    private router: Router,
    private authenticationServiceService: AuthenticationServiceService,
    private apiService: ApiService) {
    this.apiService.updateHeader();
  }
  EditAssessment(ID) {
    this.router.navigate(["../../EditSkill/" + ID])
  }

  employees: string[];
  ngOnInit() {
    setTimeout(() => {
      this.apiService.checkIfUserIsAdmin()
        .subscribe(
          (isAdminUser: string) => {
            if (isAdminUser == "0")
              this.isAdminUser = false;
            else if (isAdminUser == "1")
              this.isAdminUser = true;
            sessionStorage["IsAdminUser"] = this.isAdminUser;
            console.log("this.isAdminUser=" + this.isAdminUser);
          },
          error => console.log('oops', error)
        );

      this.apiService.getDBProficiencyLevelList()
        .subscribe(
          (ProficiencyLevelList: ProficiencyLevelObj[]) => {
            this.ProficiencyLevelArray = ProficiencyLevelList.map(x =>
              ({ label: x.ProficiencyLevel, value: x.ProficiencyLevel }));
            this.ProficiencyLevelArray[0].label = "All";
            this.ProficiencyLevelArray[0].value = null;
          },
          error => console.log('oops', error)
        );

      this.apiService.getAllAssessments()
        .subscribe(
          (data: myAssessementObj[]) => {
            this.myAssessement = data;
            console.log(data);
          },
          error => {
            console.log('This is an error from get all assessments api', error);
          }
        );
    }, 0);

  }
  confirm(ID) {

    this.confirmationService.confirm({
      //message: 'Are you sure that you want to perform this action?',
      message: 'Would you like to delete the Skill? If yes, please click on “Confirm” and your request will be automatically saved. If no, please click on “Cancel”',
      accept: () => {
        this.apiService.deleteUserAssessment(ID)
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

export class UserObj {
  username: string;
  password: string;
}
export class myAssessementObj {
  UserAssessmentID: Int32Array;
  Category: string;
  Skill: string;
  ProficiencyLevel: string;
}
export class ProficiencyLevelObj {
  ProficiencyLevelID: Int32Array;
  ProficiencyLevel: string;
}
