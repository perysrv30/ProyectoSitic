import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartAddComponent } from './cart-add.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [CartAddComponent],
  imports: [
    CommonModule,
    MatSnackBarModule, 
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    CartAddComponent
  ]
})
export class CartAddModule { }
