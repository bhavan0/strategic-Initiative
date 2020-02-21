import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//More Refactoring Needed
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  webApiUrl = "http://in01sqvd204:40000/";

  //Method to call API to get selected skill
  getSelectedSkillList(selectedValue): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "API/GetSkillList/" + selectedValue);
  }

  //Method to call API to check if skill already exists of users
  checkIfSkillAlreadyRegistered(selectedCategory, selectedSkill): Observable<any> {
    var Validateurl = this.webApiUrl + "api/Values/ValidateUserAssessmentDetails?PUID=" + sessionStorage["PUID"] + "&CategoryID=" + selectedCategory + "&SkillID=" + selectedSkill;
    return this.httpClient.get(Validateurl);
  }

  //Method to call API to add assessment to the skill of the user
  addUserAssessment(selectedCategory, selectedSkill, selectedProficiencyLevel): Observable<any> {
    var url = this.webApiUrl + "API/Values/AddUserAssessment?PUID=" + sessionStorage["PUID"] + "&CategoryID=" + selectedCategory + "&SkillID=" + selectedSkill + "&ProfLevelID=" + selectedProficiencyLevel;
    return this.httpClient.get(url);
  }

  //Method to call API to get all categories
  getCategoryList(): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetCategoryList");
  }

  //Method to call API to get all proficiency level 
  getProficiencyLevelList(): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetProficiencyLevelList");
  }

  //Method to call API to get user name logged in 
  getUserName(): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetUserName?PUID=" + sessionStorage["PUID"]);
  }

  //Method to call API to get the last update date of the user
  getLastUpdate(): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetLastUpdate?PUID=" + sessionStorage["PUID"]);
  }

  //Method to call API to check if skill exists in the category
  checkIfSkillAlreadyExistsForCategory(selectedCategory, selectedSkill): Observable<any> {
    var Validateurl = this.webApiUrl + "api/ISSkillExist?CategoryID=" + selectedCategory + "&SkillName=" + selectedSkill;
    return this.httpClient.get(Validateurl);
  }

  //Method to call API to add the skill to the category
  addSkillToCategory(selectedCategory, selectedSkill): Observable<any> {
    var url = this.webApiUrl + "API/Values/AddSkill?CategoryID=" + selectedCategory + "&SkillName=" + selectedSkill;
    return this.httpClient.get(url);
  }

  //Method to call API to check if category exists 
  checkIfCategoryAlreadyExists(CategoryName): Observable<any> {
    var Validateurl = this.webApiUrl + "api/ISCategoryExist?CategoryName=" + CategoryName;
    return this.httpClient.get(Validateurl);
  }

  //Method to call API to add category to the list
  addCategoryToList(CategoryName): Observable<any> {
    var url = this.webApiUrl + "API/Values/AddCategory?CategoryName=" + CategoryName;
    return this.httpClient.get(url);
  }

  //Method to to send excel sheet uploaded to the api
  uploadExcelUsers(formData): Observable<any> {
    return this.httpClient.post(this.webApiUrl + 'api/uploadExcel?LoggedInPUID=' + sessionStorage['PUID'], formData);
  }

  //Method to call API to check if the category can be deleted
  checkIfCategoryCanBeDeleted(ID): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/CanCategoryBeDeleted?CategoryID=" + ID);
  }

  //Method to call API to delete the category
  deleteCategory(ID): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/values/deleteCategory/" + ID)
  }

  //Method to call API to get the category master list
  getCategoryMasterList(): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetCategoryMasterList");
  }

  //Method to call API to update the category name
  updateCategory(CategoryID, UpdatedCategoryName): Observable<any> {
    var url = this.webApiUrl + "API/Values/UpdateCategory?CategoryID=" + CategoryID + "&CategoryName=" + UpdatedCategoryName;
    return this.httpClient.get(url);
  }

  //Method to call API to get the selected category
  getCategory(CategoryID): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetCategory?CategoryID=" + CategoryID);
  }

  //Method to call API to get the selected proficiency level name
  getProficiencyLevelName(selectedProfieciencyLevel): Observable<any> {
    var url = this.webApiUrl + "api/GetProficiencyLevelName?ProficiencyLevelID=" + selectedProfieciencyLevel;
    return this.httpClient.get(url)
  }

  //Method to call API to update the user assessment with new proficiency level
  updateUserAssessment(UserAssessmentID, ProficiencyLevelUpdatedValue): Observable<any> {
    var url = this.webApiUrl + "api/Values/UpdateUserAssessment?UserAssessmentID=" + UserAssessmentID + "&ProfLevelID=" + ProficiencyLevelUpdatedValue;
    return this.httpClient.get(url);
  }

  //Method to call API to get all skills
  getAllSkillList(): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetAllSkillList");
  }

  //Method to call API to get assessment detail by ID
  getAssessmentDetail(UserAssessmentID): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetAssessmentDetail/" + UserAssessmentID);
  }

  //Method to call API to update the skill name with new name
  updateSkill(SkillID, UpdatedSkillName): Observable<any> {
    var url = this.webApiUrl + "API/Values/UpdateSkill?SkillID=" + SkillID + "&SkillName=" + UpdatedSkillName;
    return this.httpClient.get(url);
  }

  //Method to call API to get skill by ID
  getSkillById(SkillID): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetSkill?SkillID=" + SkillID);
  }

  //Method to call API to get list by searched keyword
  getSearchResult(SearchText): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetSearchResult?SearchText=" + SearchText);
  }

  //Method to call API to check if the user is admin
  checkIfUserIsAdmin(): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/ISAdminUser/?PUID=" + sessionStorage["PUID"]);
  }

  //Method to call API to get all the assessments
  getAllAssessments(): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetAllAssessments?PUID=" + sessionStorage["PUID"]);
  }

  //Method to call API to delete the user assessment selected by ID
  deleteUserAssessment(ID): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "API/Values/DeleteUserAssessment/" + ID);
  }

  //Method to call API to check if the skill can be deleted
  checkIfSkillCanBeDeleted(ID): Observable<any> {
    var Validateurl = this.webApiUrl + "api/CanSkillBeDeleted?SkillID=" + ID;
    return this.httpClient.get(Validateurl);
  }

  //Method to call API to delete the skill selected by ID
  deleteSkill(ID): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/values/DeleteSkill/" + ID);
  }

  //Method to call API to get all skill master list
  getSkillMasterList(): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/GetSkillMasterList");
  }

  //Method to return the download excel URL
  getDownLoadExcelUrl(): string {
    return this.webApiUrl + "api/values/DownLoadExcel?SearchText="
  }

  //Method to return the download PDF URL
  getDownloadPDFUrl(): string {
    return this.webApiUrl + "api/values/DownLoadPDF?SearchText="
  }

  //Method to call API to get all users in DataBase
  getUserList(): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/usersList/");
  }

  //Method to call API to send the PUID of the user to be deleted
  deleteUserByPUID(PUID): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "api/deleteUserByPUID?PUID=" + PUID + "&LoggedInPUID=" + sessionStorage['PUID'])
  }

  getDBProficiencyLevelList(): Observable<any> {
    return this.httpClient.get(this.webApiUrl + "/api/GetDBProficiencyLevelList");
  }

  //Method to reload Header
  invokeEvent: Subject<any> = new Subject();
  updateHeader() {
    this.invokeEvent.next("someValue")
  }
}