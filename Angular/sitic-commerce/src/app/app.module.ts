import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SharedService } from './shared/services/shared.service';
import { MatMenuModule } from '@angular/material/menu';
import { StoreModule } from './modules/store/store.module';
import { CartAddComponent } from './modules/store/cart-add/cart-add.component';
import { MatTableModule } from '@angular/material/table';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    CartAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule, 
    BrowserModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatRippleModule
  ],
  providers: [
    { provide: SharedService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
