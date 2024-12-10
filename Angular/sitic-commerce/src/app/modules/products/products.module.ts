import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ProductDialogModule } from './components/product-dialog/product-dialog.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StockStatusModule } from 'src/app/shared/pipes/stock-status/stock-status/stock-status.module';
import { MatIconModule } from '@angular/material/icon';
import { ProductConfirmModule } from './components/product-confirm/product-confirm.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductConfirmComponent } from './components/product-confirm/product-confirm.component';
@NgModule({
  declarations: [
    ProductsComponent,
    ProductConfirmComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,

    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    // MatIconModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatDialogModule,
    //PIPES
    StockStatusModule,

    // CUSTOM
    ProductDialogModule, 
    ProductConfirmModule
  ]
})
export class ProductsModule { }
