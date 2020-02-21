import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSelfAssessmentComponent } from './SelfAssessment/list-self-assessment.component';
import { AddNewSkillComponent } from './add-new-skill/add-new-skill.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { ExpertSerchListComponent } from './expert-serch-list/expert-serch-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddNewcategoryComponent } from './add-newcategory/add-newcategory.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { AddNewSkillMasterComponent } from './add-new-skill-master/add-new-skill-master.component';
import { EditSkillMasterComponent } from './edit-skill-master/edit-skill-master.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { UserListComponent } from './user-list/user-list.component';

const appRoutes: Routes = [
  { 
    path:'AddNewSkill' , component:AddNewSkillComponent
  },
  { 
    path:'EditSkill' , component:EditSkillComponent
  },
  { 
    path:'ExpertSearch' , component:ExpertSerchListComponent
  },
  { 
    path:'CategoryMaster' , component:CategoryListComponent
  },
  { 
    path:'SkillMaster' , component:SkillListComponent
  },
  { 
    path:'AddNewCategory' , component:AddNewcategoryComponent
  },
  { 
    path:'AddNewSkillMaster' , component:AddNewSkillMasterComponent
  },
  { 
    path:'EditCategory/:ID' , component:EditCategoryComponent
  },
  { 
    path:'EditSkillMaster/:ID' , component:EditSkillMasterComponent
  },
  { 
    path:'EditSkill/:UserAssessmentID' , component:EditSkillComponent
  },
  { 
    path:'SelfAssessment' , component:ListSelfAssessmentComponent
  },
  {
    path:'',redirectTo:'SelfAssessment',pathMatch:'full'
  },
  {
    path:'UploadUsers',component:BulkUploadComponent
  },
  {
    path:'Users',component:UserListComponent
  }
  ];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
