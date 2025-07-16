import { Component, contentChildren, effect, viewChild } from '@angular/core';
import { Container } from '../../../../../../../lib/src/lib/components/container/container';
import { Table } from '../../../../../../../lib/src/lib/components/table/table';
import { Paginator } from '../../../../../../../lib/src/lib/components/paginator/paginator';
import { TCourse } from '../../types/course';
import { StatusEnum } from '../../../../core/enums/status';
import { Metadata } from '../../../../core/types/metadata';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatColumnDef, MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'cdev-course-list',
  imports: [Container, Table, Paginator, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {
  dataOriginal: TCourse[] = [
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
    { courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE },
    { courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE },
    { courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE },
    { courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE },
  ];

  metadata: Metadata<TCourse> = [
    {
      field: "courseId",
      label: "ID"
    },
    {
      field: "title",
      label: "Title"
    },
    {
      field: "status",
      label: "Status"
    }
  ];

  dataSource: TCourse[] = []

  pageSize = 15
  currentPage = 0

  constructor() {
    this.loadPage(0)
  }

  loadPage(page: number) {
    this.currentPage = page;
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    this.dataSource = this.dataOriginal.slice(start, end);
  }

}
