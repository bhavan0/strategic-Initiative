import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSkillMasterComponent } from './edit-skill-master.component';

describe('EditSkillMasterComponent', () => {
  let component: EditSkillMasterComponent;
  let fixture: ComponentFixture<EditSkillMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSkillMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSkillMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
