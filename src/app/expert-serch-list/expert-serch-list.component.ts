import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { stringify } from '@angular/compiler/src/util';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ApiService } from '../service/api.service';

declare let jsPDF;

@Component({
  selector: 'app-expert-serch-list',
  templateUrl: './expert-serch-list.component.html',
  styleUrls: ['./expert-serch-list.component.css']
})
export class ExpertSerchListComponent implements OnInit {

  SearchResult: SearchResultObj[] = [];
  textBoxInput: string = "";
  SearchText: string = "";
  UserAssessmentDetailsArray: any;
  ProficiencyLevelArray: any;
  isAdminUser: any;
  constructor(private httpClient: HttpClient, private authenticationServiceService: AuthenticationServiceService, private apiService: ApiService) {
    this.apiService.updateHeader();
  }
  onBlurSearch(SearchText) {
    this.SearchText = SearchText;
  }
  DownLoadExcel() {
    window.location.href = this.apiService.getDownLoadExcelUrl() + this.SearchText;
  }
  DownloadPDF() {
    window.location.href = this.apiService.getDownloadPDFUrl() + this.SearchText;
  }

  PopulateSearchText() {
    if (this.SearchText == null)
      this.SearchText = "";
    this.apiService.getSearchResult(this.SearchText)
      .subscribe(
        (data: SearchResultObj[]) => {
          this.SearchResult = data;
          console.log(data);
        },
        error => console.log('oops', error)
      );
  }
  ngOnInit() {

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
    this.apiService.checkIfUserIsAdmin()
      .subscribe(
        (isAdminUser: string) => {
          if (isAdminUser == "0")
            this.isAdminUser = false;
          else if (isAdminUser == "1")
            this.isAdminUser = true;
          sessionStorage["IsAdminUser"] = this.isAdminUser;
          console.log(" expert search this.isAdminUser=" + this.isAdminUser);
        },
        error => console.log('oops', error)
      );

    console.log("SerachText=" + this.SearchText);

    this.PopulateSearchText();
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.PopulateSearchText()
    }
  }
}

export class SearchResultObj {
  UserAssessmentID: Int32Array;
  PUID: string;
  DisplayName: string;
  Country: string;
  Title: string;
  Category: string;
  Skill: string;
  ProficiencyLevel: string;
}
export class ProficiencyLevelObj {
  ProficiencyLevelID: Int32Array;
  ProficiencyLevel: string;
}
