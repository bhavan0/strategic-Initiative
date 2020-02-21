import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ApiService } from '../service/api.service';


declare var ValidateAddNewSkill: Function;


@Component({
  selector: 'app-add-new-skill',
  templateUrl: './add-new-skill.component.html',
  styleUrls: ['./add-new-skill.component.css'],
  providers: [ConfirmationService]
})




export class AddNewSkillComponent implements OnInit {


  CategoryArray = [];
  ProficiencyLevelArray = [];
  LoggedInUserName: string;
  LastupdateTime: string;
  filterSkills = [];
  isAdminUser: any;
  // Dropdown list varaible
  // Category
  selectedCategory: any;
  selectedSkill: any;
  selectedProficiencyLevel: any;

  OpenOutLook() {
    var EMailBody = "Dear Expert DataBase Admin ," + '\r\n' + "Kindly Add Below Skill in Expert Database System.";
    window.location.href = "mailto:ITHCMproject@eurofins.com?subject=Kindly Help to Add Skill in Expert DataBase&body=";
  }
  constructor(private router: Router,
    private confirmationService: ConfirmationService,
    private authenticationServiceService: AuthenticationServiceService,
    private apiService: ApiService) {
    this.apiService.updateHeader();
  }

  // Method to handle user drop down input
  SetSkillValue(selectedValue) {
    this.selectedSkill = selectedValue;
  }
  SetProfLevelValue(selectedValue) {
    this.selectedProficiencyLevel = selectedValue;
  }
  filterSelectedSkills(selectedValue) {
    this.selectedCategory = selectedValue;

    this.apiService.getSelectedSkillList(selectedValue)
      .subscribe(
        (SkillsforCategory: SkillsforCategory[]) => {
          this.filterSkills = SkillsforCategory.map(x => ({ label: x.SkillName, value: x.SkillID }));
          console.log('CategoryList=' + SkillsforCategory);
        },
        error => console.log('oops', error)
      );

  }



  AddAssessment() {
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
        message: 'Please Select Skill Value',
        accept: () => {
        }
      });
    }
    if (isvalidated && this.selectedProficiencyLevel == undefined) {
      isvalidated = false;
      this.confirmationService.confirm({
        message: 'Please Select Proficiency Level',
        accept: () => {
        }
      });
    }

    if (isvalidated) {
      this.apiService.checkIfSkillAlreadyRegistered(this.selectedCategory, this.selectedSkill)
        .subscribe(
          (id) => {
            console.log(id);
            if (id > 0) {
              this.confirmationService.confirm({
                message: 'The given Skill is already registered in your record. To update, please edit or delete the Skill in self-assessment page',
                accept: () => {
                }
              });
              isvalidated = false;
              this.AddDB(isvalidated);
            }
            else { this.AddDB(isvalidated); }
          },
          error => console.log('oops', error)
        );
    }
  }

  AddDB(isvalidated) {
    console.log("isvalidated=" + isvalidated);
    if (isvalidated) {

      this.apiService.addUserAssessment(this.selectedCategory, this.selectedSkill, this.selectedProficiencyLevel)
        .subscribe(
          (id) => {
            this.router.navigate(["../SelfAssessment"])
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
            ({label:x.CategoryName,value:x.CategoryID}));
          console.log('CategoryArray='+this.CategoryArray)  
          console.log('CategoryList=' + CategoryList);
        },
        error => console.log('oops', error)
      );

    this.apiService.getProficiencyLevelList()
      .subscribe(
        (ProficiencyLevelList: ProficiencyLevelObj[]) => {
          this.ProficiencyLevelArray = ProficiencyLevelList.map(x =>
            ({ label: x.ProficiencyLevelName, value: x.ProficiencyLevelID }));
          console.log(ProficiencyLevelList);
        },
        error => console.log('oops', error)
      );

    this.LoggedInUserName = sessionStorage['UserName'];


  }
}

export class SkillsforCategory {
  SkillID: Int32Array;
  SkillName: string;
}
export class CategoryObj {
  CategoryID: Int32Array;
  CategoryName: string;
}
export class ProficiencyLevelObj {
  ProficiencyLevelID: Int32Array;
  ProficiencyLevelName: string;
}
export class ValidateComponent {
  constructor() {
    ValidateAddNewSkill();
  }
}
export class Module {

  handleClick() {
    //execute action
    alert("Submit button Clicked");
  }

}
