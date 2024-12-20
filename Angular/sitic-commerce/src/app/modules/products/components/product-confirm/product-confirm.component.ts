import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-products-confirm',
  templateUrl: './product-confirm.component.html',
  styleUrls: ['./product-confirm.component.scss']
})
export class ProductConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string;}
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
