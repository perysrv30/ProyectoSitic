import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'imgPath', 'name', 'description', 'price', 'currentStock', 'updatedAt', 'tags'];
  constructor() { }

  ngOnInit(): void {
  }

}
