/* import { Component } from '@angular/core'; */

import { inject } from "@angular/core";
import { Metadata } from "../../../core/types/metadata";
import { LayoutService } from "../../modules/layout/layout.service";

/* @Component({
  selector: 'cdev-component-base',
  imports: [],
  templateUrl: './component-base.html',
  styleUrl: './component-base.css'
}) */
export abstract class ComponentBase<T> {
  private readonly layoutService = inject(LayoutService);
  abstract dataOriginal: T[];

  abstract metadata: Metadata<T>

  abstract dataSource: T[];

  pageSize = 15;

  currentPage = 0;

  constructor() {
    this.layoutService.changeConfigLayout({
      header: true,
      menu: true
    });
  }

  loadPage(page: number) {
    console.log('Loading page:', page);
    console.log('Data original:', this.dataOriginal);
    this.currentPage = page;
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    this.dataSource = this.dataOriginal.slice(start, end);
  }
}
