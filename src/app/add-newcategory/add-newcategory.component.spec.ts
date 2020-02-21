import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewcategoryComponent } from './add-newcategory.component';

describe('AddNewcategoryComponent', () => {
  let component: AddNewcategoryComponent;
  let fixture: ComponentFixture<AddNewcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
