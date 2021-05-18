import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarroComponent } from './create-procedimento.component';

describe('CreateCarroComponent', () => {
  let component: CreateCarroComponent;
  let fixture: ComponentFixture<CreateCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCarroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
