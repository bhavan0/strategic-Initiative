import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { ApiService } from '../service/api.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css'],
  providers: [ConfirmationService]

})

export class EditSkillComponent implements OnInit {
  LoggedInUserName: string;
  myAssessement: myAssessementObj[] = [];
  Category: string;
  Skill: string;
  CategoryID;
  ProficiencyLevel: string;
  UserAssessmentID: number;
  ProficiencyLevelUpdatedValue: number;
  CategoryArray: any;
  ProficiencyLevelArray: any;
  index: any;
  selectedCategory;
  filterSkills = [];
  selectedProfieciencyLevel: any;
  isAdminUser: any;

  selectedItem: any;
  constructor(private confirmationService: ConfirmationService,private activatedRoute: ActivatedRoute, 
    private router: Router, private apiService: ApiService) {
    let id = this.activatedRoute.snapshot.params["UserAssessmentID"];
    this.UserAssessmentID = id;
    this.apiService.updateHeader();

  }
  updateSelectedValue() {
    console.log(this.selectedProfieciencyLevel);

    this.apiService.getProficiencyLevelName(this.selectedProfieciencyLevel)
      .subscribe(
        (ProficiencyLevelName) => {
          this.ProficiencyLevelUpdatedValue = this.selectedProfieciencyLevel;
          this.selectedProfieciencyLevel = { label: ProficiencyLevelName, value: this.selectedProfieciencyLevel }
        },
        error => console.log('oops', error)
      );



  }

  SetProfLevelValue(selectedValue) {
    this.ProficiencyLevelUpdatedValue = selectedValue;
  }
  PopulateProficiencyLevel() {
    if (this.ProficiencyLevel && this.ProficiencyLevelArray) {
     
      let index = this.ProficiencyLevelArray.findIndex(element => element.label == this.ProficiencyLevel)
      
      setTimeout(() => {
        let element: HTMLElement = null;
        if (index >= 0) {
          element = document.getElementById("option-" + index);
          element.setAttribute("selected", "selected");
        }
      });


    }
    
  }

  EditAssesssment() {
    var isvalidated = true;
    if (this.ProficiencyLevelUpdatedValue == 0) {
      isvalidated = false;
      this.confirmationService.confirm({
        message: 'Please Select Proficiency Level',
        accept: () => {
        }
      });
    }

    if(isvalidated){
    this.apiService.updateUserAssessment(this.UserAssessmentID, this.ProficiencyLevelUpdatedValue)
      .subscribe(
        (id) => {
          //alert(id);      
          this.router.navigate(["../SelfAssessment"])
        },
        error => console.log('oops', error)
      );
    }
  }
  ngAfterViewInit() {

    this.apiService.getCategoryList()
      .subscribe(
        (CategoryList: CategoryObj[]) => {
          this.CategoryArray = CategoryList.map(x =>
            ({ label: x.CategoryName, value: x.CategoryID }));
        },
        error => console.log('oops', error)
      );

    this.apiService.getAllSkillList()
      .subscribe(
        (SkillsforCategory: SkillsforCategory[]) => {
          this.filterSkills = SkillsforCategory.map(x => ({ label: x.SkillName, value: x.SkillID }));
        },
        error => console.log('oops', error)
      );

    this.apiService.getProficiencyLevelList()
      .subscribe(
        (ProficiencyLevelList: ProficiencyLevelObj[]) => {
          this.ProficiencyLevelArray = ProficiencyLevelList.map(x =>
            ({ label: x.ProficiencyLevelName, value: x.ProficiencyLevelID }));
          this.PopulateProficiencyLevel();
        },
        error => console.log('oops', error)
      );
  }
  ngOnInit() {
    this.isAdminUser = sessionStorage["IsAdminUser"];

    this.apiService.getAssessmentDetail(this.UserAssessmentID)
      .subscribe(
        (data: myAssessementObj[]) => {
          this.myAssessement = data;
          this.Category = this.myAssessement[0].Category;
          this.Skill = this.myAssessement[0].Skill;
          this.CategoryID = this.myAssessement[0].CategoryID;
          this.ProficiencyLevel = this.myAssessement[0].ProficiencyLevel;
          this.selectedProfieciencyLevel = { label: this.myAssessement[0].ProficiencyLevel, value: this.myAssessement[0].ProficiencyLevelID }
          this.ProficiencyLevelUpdatedValue = this.myAssessement[0].ProficiencyLevelID;
          console.log("Prof Level="+this.ProficiencyLevel);
          console.log("CategoryID=" + this.CategoryID);
          this.PopulateProficiencyLevel();
          this.selectedCategory = this.Category;
        },
        error => console.log('oops', error)
      );


  }

}

export class myAssessementObj {
  UserAssessmentID: Int32Array;
  CategoryID: Int32Array;
  Category: string;
  Skill: string;
  ProficiencyLevel: string;
  ProficiencyLevelID: any;
}
export class ProficiencyLevelObj {
  ProficiencyLevelID: Int32Array;
  ProficiencyLevelName: string;
}
export class CategoryObj {
  CategoryID: Int32Array;
  CategoryName: string;
}
export class SkillsforCategory {
  SkillID: Int32Array;
  SkillName: string;
}
