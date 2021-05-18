import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProcedimentoComponent } from './edit-procedimento.component';

describe('EditProcedimentoComponent', () => {
  let component: EditProcedimentoComponent;
  let fixture: ComponentFixture<EditProcedimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProcedimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProcedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
