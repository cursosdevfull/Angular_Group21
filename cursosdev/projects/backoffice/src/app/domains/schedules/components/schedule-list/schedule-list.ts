import { Component, Injector } from '@angular/core';
import { ComponentBase } from '../../../../shared/components/component-base/component-base';
import { TSchedule } from '../../types/schedule';
import { StatusEnum } from '../../../../core/enums/status';
import { Metadata } from '../../../../core/types/metadata';
import { Status } from '../../../../shared/components/status/status';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Container } from '../../../../../../../lib/src/lib/components/container/container';
import { Paginator } from '../../../../../../../lib/src/lib/components/paginator/paginator';
import { Table } from '../../../../../../../lib/src/lib/components/table/table';

@Component({
  selector: 'cdev-schedule-list',
  imports: [Container, Table, Paginator, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './schedule-list.html',
  styleUrl: './schedule-list.css'
})
export class ScheduleList extends ComponentBase<TSchedule, any> {
  dataOriginal: TSchedule[] = [
    { scheduleId: 1, courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE, startDate: new Date().toLocaleDateString(), duration: 60, frequency: 'Weekly' },
    { scheduleId: 2, courseId: 2, title: 'Advanced Angular', status: StatusEnum.INACTIVE, startDate: new Date().toLocaleDateString(), duration: 60, frequency: 'Weekly' },
    { scheduleId: 3, courseId: 3, title: 'Angular Testing', status: StatusEnum.ACTIVE, startDate: new Date().toLocaleDateString(), duration: 60, frequency: 'Weekly' },
    { scheduleId: 4, courseId: 4, title: 'Angular Performance', status: StatusEnum.INACTIVE, startDate: new Date().toLocaleDateString(), duration: 60, frequency: 'Weekly' },
    { scheduleId: 5, courseId: 1, title: 'Angular Basics', status: StatusEnum.ACTIVE, startDate: new Date().toLocaleDateString(), duration: 60, frequency: 'Weekly' },
  ];

  service: any = null

  metadata: Metadata<TSchedule> = [
    {
      field: "courseId",
      label: "ID"
    },
    {
      field: "title",
      label: "Title"
    },
    {
      field: "startDate",
      label: "Start Date"
    },
    {
      field: "duration",
      label: "Duration (hours)"
    },
    {
      field: "frequency",
      label: "Frequency"
    },
    {
      field: "status",
      label: "Status",
      component: Status
    }
  ];

  //dataSource: TSchedule[] = []

  constructor(injector: Injector) {
    super(injector)
    this.loadPage(0);
  }
}
