import { Component, effect, input, output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatorCustom } from '../../../../../backoffice/src/app/core/classes/paginator-custom';

@Component({
  selector: 'cdev-lib-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorCustom
    }
  ]
})
export class Paginator {
  length = input<number>(0); // Total number of items
  pageSize = input<number>(10); // Number of items per page

  onChangePage = output<number>();

  constructor() {
    console.log('Paginator component initialized');
    effect(() => {
      console.log(`Paginator initialized with length: ${this.length()}, pageSize: ${this.pageSize()}`);
    });
  }

  loadPage(event: PageEvent) {
    this.onChangePage.emit(event.pageIndex)
  }

}
