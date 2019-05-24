import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVictoryComponent } from './modal-victory.component';

describe('ModalVictoryComponent', () => {
  let component: ModalVictoryComponent;
  let fixture: ComponentFixture<ModalVictoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVictoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVictoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
