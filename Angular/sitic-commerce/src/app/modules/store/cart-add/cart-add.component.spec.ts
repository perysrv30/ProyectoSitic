import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAddComponent } from './cart-add.component';

describe('CartAddComponent', () => {
  let component: CartAddComponent;
  let fixture: ComponentFixture<CartAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
