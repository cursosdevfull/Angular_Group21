import { TitleCasePipe } from '@angular/common';
import { Component, computed, contentChildren, effect, input, signal, viewChild, viewChildren, ViewContainerRef } from '@angular/core';
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

  displayedColumns = signal<string[]>([]);

  columnDefs = contentChildren<MatColumnDef>(MatColumnDef)
  table = viewChild.required<MatTable<any>>(MatTable);
  containersElementStatus = viewChildren('status', { read: ViewContainerRef });

  constructor() {
    // Inicializar displayedColumns basado en metadata
    effect(() => {
      const metadataColumns = this.metadata().map(item => item.field as string);
      this.displayedColumns.set(metadataColumns);
    });

    effect(() => {
      const columns = this.columnDefs()

      if (columns) {
        console.log('Columns:', columns);
        columns.forEach(column => {
          if (!this.displayedColumns().includes(column.name)) {
            this.table().addColumnDef(column);
            this.displayedColumns.update(value => [...value, column.name]);
          }
        });
      }
    })
  }

  ngAfterViewInit() {
    this.loadElementStatus();
  }

  loadElementStatus() {
    const elements = this.containersElementStatus();
    const metadataWithComponents = this.metadata().filter(meta => meta.component)

    let counter = 0
    for (const element of elements) {
      const metadata = metadataWithComponents[0];
      const el = this.dataSource()[counter++];

      if (metadata.component) {
        element.clear();
        const componentRef = element.createComponent(metadata.component);
        if (el.status === "active") {
          componentRef.instance.isActive = true;
        }
      }
    }
  }
}
