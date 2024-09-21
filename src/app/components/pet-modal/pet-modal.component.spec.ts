import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetModalComponent } from './pet-modal.component';

describe('PetModalComponent', () => {
  let component: PetModalComponent;
  let fixture: ComponentFixture<PetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
