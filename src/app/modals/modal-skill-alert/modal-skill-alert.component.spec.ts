import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSkillAlertComponent } from './modal-skill-alert.component';

describe('ModalSkillAlertComponent', () => {
  let component: ModalSkillAlertComponent;
  let fixture: ComponentFixture<ModalSkillAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSkillAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSkillAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
