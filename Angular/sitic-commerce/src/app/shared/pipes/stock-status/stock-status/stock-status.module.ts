import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockStatusPipe } from '../stock-status.pipe';

@NgModule({
  declarations: [ StockStatusPipe],
  imports: [
    CommonModule
  ],
  exports: [ StockStatusPipe]
})
export class StockStatusModule { }
