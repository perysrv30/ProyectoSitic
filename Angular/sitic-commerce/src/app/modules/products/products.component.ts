import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { MatTableDataSource } from '@angular/material/table';

import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';

import { ProductsService } from 'src/app/shared/services/products.service';

import { eErrorType, eScreenStatus } from 'src/app/shared/interfaces/comun/enums.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductConfirmComponent } from './components/product-confirm/product-confirm.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'imgPath', 'name', 'description', 'price', 'currentStock', 'updatedAt', 'tags'];
  productList: Product[] = [];
  dataSource = new MatTableDataSource<Product>(this.productList);
  loading: boolean = false;
  productSearch: Product[]=[];

  constructor(private dialog: MatDialog,
      private productsService: ProductsService) { }

  async ngOnInit(): Promise<void> {
    this.dataSource = new MatTableDataSource(); 
    await this.getAllProducts();
  }

  applySearch(event: Event): void{
    const inputElement = event.target as HTMLInputElement; 
    const query = inputElement.value.trim().toLowerCase(); 
    this.dataSource.filter = query;
  }

  async getAllProducts() {
    this.loading = true;
    await this.productsService.getAllProducts().then((resp: ProductsResponse) => {
      this.loading = false;
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return;
      }

      this.dataSource.data = resp.products;
    }).catch((err) => {
      this.loading = false;
      console.error(err);
    });
  }

  async onClickDelete(item: Product) {
    const dialogRef = this.dialog.open(ProductConfirmComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de que deseas eliminar este producto? ' + item.name,
      }
    });

    const result = await dialogRef.afterClosed().toPromise(); 
    if (result) {
      await this.deleteProduct(item.id);
      await this.getAllProducts();
    } else {
    }
  }

  onClickReadMore(item: Product){
    this.showDialogProduct(eScreenStatus.ViewDetail, item.id);
  }

  async onClickModify(item: Product){
    let result = await this.showDialogProduct(eScreenStatus.Updating, item.id);

    if(result.refreshProducts)
      this.getAllProducts();
  }

  async onClickAdd() {
    let result = await this.showDialogProduct(eScreenStatus.Adding);

    if(result.refreshProducts)
      this.getAllProducts();
  }

  async showDialogProduct(eScreenStatus: eScreenStatus, id?: number):Promise<any> {
    const dialogProduct = this.dialog.open(ProductDialogComponent, {
      data: { 
        eScreenStatus,
        id
      },
      disableClose: true
    });

    return await lastValueFrom(dialogProduct.afterClosed()).then(result => {
      return Promise.resolve(result);
    });
  }

  async deleteProduct(id: number) {
    this.loading = true;
    await this.productsService.deleteProduct(id).then((resp: ProductsResponse) => {
      this.loading = false;
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return;
      }
  
      this.dataSource.data = resp.products;
  
    }).catch((err) => {
      console.error(err);
    });
  }
}
