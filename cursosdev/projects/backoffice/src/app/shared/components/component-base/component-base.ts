/* import { Component } from '@angular/core'; */

import { effect, inject, Injector, runInInjectionContext, signal, computed } from "@angular/core";
import { Metadata } from "../../../core/types/metadata";
import { LayoutService } from "../../modules/layout/layout.service";
import { BaseService } from "../../../core/interfaces/base-service";
import { Paginate } from "../../../core/types/paginate";

export abstract class ComponentBase<T, U extends BaseService<T>> {
  private readonly layoutService = inject(LayoutService);
  abstract service: U;

  abstract metadata: Metadata<T>

  pageSize = 15;

  currentPage = 0;

  // Use signal for the current page response
  protected currentPageResponse = signal<Paginate<T> | undefined>(undefined);

  // Computed signal for dataSource based on the response
  dataSource = computed(() => {
    const response = this.currentPageResponse();
    return response ? response.data : [];
  });

  pagination = computed(() => {
    const response = this.currentPageResponse();
    return response ? response.pagination : undefined;
  });

  constructor(protected injector: Injector) {
    this.layoutService.changeConfigLayout({
      header: true,
      menu: true
    });
  }

  loadPage(page: number) {
    runInInjectionContext(this.injector, () => {
      console.log('Loading page:', page);
      this.currentPage = page;

      const response = this.service.getByPage(page);

      effect(() => {
        const data = response();
        if (data) {
          this.currentPageResponse.set(data);
        }
      });
    });
  }

  abstract openForm(data?: any): void;
}
