import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {

  constructor(private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private router: Router) {
    this.apiService.updateHeader();
  }
  isAdminUser: any;
  ngOnInit() {
    this.isAdminUser = sessionStorage["IsAdminUser"];
  }

  onChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      this.apiService.uploadExcelUsers(formData).subscribe(data => { this.confirm() }, err => { console.log("error") })

    }
  }
  goBack() {
    this.router.navigate(["../SelfAssessment"])
  }
  confirm() {

    this.confirmationService.confirm({
      message: 'Users Have Been Uploaded',
      accept: () => {
      }
    });
  }

}