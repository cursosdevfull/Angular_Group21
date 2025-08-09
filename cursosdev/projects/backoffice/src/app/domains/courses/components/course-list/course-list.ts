import { Component, effect, inject, Injector, runInInjectionContext, signal } from '@angular/core';
import { Container } from '../../../../../../../lib/src/lib/components/container/container';
import { Table } from '../../../../../../../lib/src/lib/components/table/table';
import { Paginator } from '../../../../../../../lib/src/lib/components/paginator/paginator';
import { TCourse } from '../../types/course';
import { Metadata } from '../../../../core/types/metadata';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ComponentBase } from '../../../../shared/components/component-base/component-base';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Confirm } from '../../../../core/components/confirm/confirm';
import * as XLSX from 'xlsx';
import { CoursePort } from '../../ports/course.port';
import { CourseAdapter } from '../../adapters/course.adapter';
import { Course } from '../../application/course';
import { CourseForm } from '../course-form/course-form';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'cdev-course-list',
  imports: [Container, Table, Paginator, MatButtonModule, MatIconModule, MatTableModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
  providers: [CourseService, CourseAdapter
  ],
})
export class CourseList extends ComponentBase<TCourse, CourseService> {
  dataOriginal: TCourse[] = [];

  service: CourseService = inject(CourseService);

  metadata: Metadata<TCourse> = [
    {
      field: "courseId",
      label: "ID"
    },
    {
      field: "name",
      label: "Name"
    },

  ];


  port: CoursePort = inject(CourseAdapter);

  listCourses = signal<TCourse[]>([]);

  constructor(protected override injector: Injector, private readonly dialog: MatDialog, private readonly notifier: MatSnackBar) {
    super(injector)
  }

  ngAfterContentInit() {
    this.loadPage(0);
  }

  openForm(data?: any): void {
    const reference = this.dialog.open(CourseForm, {
      disableClose: true,
      panelClass: 'cdev-dialog',
      data,
    })

    reference.afterClosed().subscribe(result => {
      if (!result) return;

      runInInjectionContext(this.injector, () => {
        if (result.courseId) {
          this.port.update(result);
          this.notifier.open("Course updated successfully", "Close", {
            duration: 3000
          });
        } else {
          this.port.create(result);
          this.notifier.open("Course created successfully", "Close", {
            duration: 3000
          });
        }

        this.loadPage(this.currentPage);
      })

    })
  }

  delete(element: TCourse) {
    const reference = this.dialog.open(Confirm)
    reference.componentInstance.message = `Are you sure you want to delete course ${element.name}?`

    reference.afterClosed().subscribe(result => {
      if (!result) return;

      runInInjectionContext(this.injector, () => {
        this.port.delete(element.courseId)
        this.notifier.open("Course deleted successfully", "Close", {
          duration: 3000
        });

        this.loadPage(this.currentPage);

      })
    });
  }

  export() {
    runInInjectionContext(this.injector, () => {
      const allCoursesSignal = this.port.getAll();

      // Usar effect para detectar cuando la lista está disponible
      effect(() => {
        const coursesList = allCoursesSignal() as any;
        if (coursesList && coursesList.data && coursesList.data.length > 0) {
          console.log('Lista de usuarios disponible:', coursesList);
          // Aquí ya tienes la lista completa de usuarios para exportar
          this.exportToExcel(coursesList.data);
        }
      });
    })
  }

  private exportToExcel(courses: Course[]) {
    // Aquí puedes implementar tu lógica de exportación
    // La lista completa de usuarios está disponible en el parámetro 'courses'
    console.log('Exportando usuarios a Excel:', courses);

    // Ejemplo de cómo podrías estructurar los datos:
    const dataForExport = courses.map(course => ({
      CourseId: course.courseId,
      Name: course.name,
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Courses');

    // Exportar el archivo Excel
    XLSX.writeFile(wb, 'courses.xlsx');
  }

}
