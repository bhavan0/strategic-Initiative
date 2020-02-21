import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListSelfAssessmentComponent } from './SelfAssessment/list-self-assessment.component';
import { AppRoutingSelfModule } from './app-routing-self.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddNewSkillComponent } from './add-new-skill/add-new-skill.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { FormsModule } from "@angular/forms";
import { ExpertSerchListComponent } from './expert-serch-list/expert-serch-list.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {SelectItem} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';

import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/Datatable';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddNewcategoryComponent } from './add-newcategory/add-newcategory.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { AddNewSkillMasterComponent } from './add-new-skill-master/add-new-skill-master.component';
import { EditSkillMasterComponent } from './edit-skill-master/edit-skill-master.component';
import { AuthenticationServiceService} from '../authentication-service.service';
import { HttpIntercepterService } from '../http-intercepter.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { UserListComponent } from './user-list/user-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
//import {NgbModule} from 'ngx-bootstrap/ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
      ListSelfAssessmentComponent,
      AddNewSkillComponent,
      EditSkillComponent,
      ExpertSerchListComponent,
      CategoryListComponent,
      AddNewcategoryComponent,
      EditCategoryComponent,
      SkillListComponent,
      AddNewSkillComponent,
      AddNewSkillMasterComponent,
      EditSkillMasterComponent,
      BulkUploadComponent,
      UserListComponent,
      FooterComponent,
      HeaderComponent
      
  
      
  ],
  imports: [
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    //NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingSelfModule,
    FormsModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    DataTableModule
  ],
  providers: [ConfirmationService,AuthenticationServiceService,
  {
    provide: HTTP_INTERCEPTORS, 
    useClass: HttpIntercepterService,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
