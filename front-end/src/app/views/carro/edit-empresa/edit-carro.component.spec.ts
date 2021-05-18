import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarroComponent } from './edit-carro.component';

describe('EditCarroComponent', () => {
  let component: EditCarroComponent;
  let fixture: ComponentFixture<EditCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
