import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGameStartComponent } from './modal-game-start.component';

describe('ModalGameStartComponent', () => {
  let component: ModalGameStartComponent;
  let fixture: ComponentFixture<ModalGameStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGameStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGameStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
