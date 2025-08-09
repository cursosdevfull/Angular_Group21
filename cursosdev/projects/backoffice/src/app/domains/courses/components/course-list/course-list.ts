import { Component, Injector } from '@angular/core';
import { Container } from '../../../../../../../lib/src/lib/components/container/container';
import { Table } from '../../../../../../../lib/src/lib/components/table/table';
import { Paginator } from '../../../../../../../lib/src/lib/components/paginator/paginator';
import { TCourse } from '../../types/course';
import { StatusEnum } from '../../../../core/enums/status';
import { Metadata } from '../../../../core/types/metadata';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Status } from '../../../../shared/components/status/status';
import { ComponentBase } from '../../../../shared/components/component-base/component-base';

@Component({
  selector: 'cdev-course-list',
  imports: [Container, Table, Paginator, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList extends ComponentBase<TCourse, any> {
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

  service: any = null

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
      label: "Status",
      component: Status
    }
  ];

  //dataSource: TCourse[] = []

  constructor(injector: Injector) {
    super(injector)
    this.loadPage(0);
  }
}
