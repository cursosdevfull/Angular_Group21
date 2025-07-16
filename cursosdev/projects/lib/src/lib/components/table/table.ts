import { TitleCasePipe } from '@angular/common';
import { Component, computed, contentChildren, effect, input, viewChild } from '@angular/core';
import { MatColumnDef, MatTable, MatTableModule } from '@angular/material/table';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-om-perfect-scrollbar';
import { Metadata } from '../../../../../backoffice/src/app/core/types/metadata';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@Component({
  selector: 'cdev-lib-table',
  imports: [MatTableModule, PerfectScrollbarModule, TitleCasePipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class Table {
  dataSource = input<any[]>([]);
  metadata = input<Metadata<any>>([]);

  displayedColumns = computed(() => this.metadata().map(item => item.field as string));

  columnDefs = contentChildren<MatColumnDef>(MatColumnDef)
  table = viewChild.required<MatTable<any>>(MatTable);

  constructor() {
    effect(() => {
      const columns = this.columnDefs()

      if (columns) {
        columns.forEach(column => {
          if (!this.displayedColumns().includes(column.name)) {
            this.table().addColumnDef(column);
          }
          //this.metadata().update(value => [...value, { field: column.name, label: column.name }]);
        });
      }
    })
  }
}
