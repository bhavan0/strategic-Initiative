import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSkillMasterComponent } from './add-new-skill-master.component';

describe('AddNewSkillMasterComponent', () => {
  let component: AddNewSkillMasterComponent;
  let fixture: ComponentFixture<AddNewSkillMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSkillMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSkillMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
