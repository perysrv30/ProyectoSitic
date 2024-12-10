import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { StockStatusModule } from 'src/app/shared/pipes/stock-status/stock-status/stock-status.module';


@NgModule({
  declarations: [
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    //PIPES
    StockStatusModule
  ],
  exports: [
    ProductCardComponent,
  ]
})
export class ProductCardModule { }
