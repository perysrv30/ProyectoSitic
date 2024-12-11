import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { ProductCardModule } from '../products/components/product-card/product-card.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CartAddComponent } from './cart-add/cart-add.component';



@NgModule({
  declarations: [
    StoreComponent,
    CartAddComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MatProgressBarModule,
    MatIconModule,
    ProductCardModule
  ],
  exports:[
    CartAddComponent
  ]
})
export class StoreModule { }
