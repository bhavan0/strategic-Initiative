import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertSerchListComponent } from './expert-serch-list.component';

describe('ExpertSerchListComponent', () => {
  let component: ExpertSerchListComponent;
  let fixture: ComponentFixture<ExpertSerchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertSerchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertSerchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
