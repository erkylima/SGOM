import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmpresaComponent } from './edit-empresa.component';

describe('EditEmpresaComponent', () => {
  let component: EditEmpresaComponent;
  let fixture: ComponentFixture<EditEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
