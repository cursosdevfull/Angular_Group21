import { Component, Inject } from '@angular/core';
import { CourseService } from '../course.service';
import { DateService } from '../date';

@Component({
  selector: 'app-students',
  imports: [],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students {
  instanceCourse: CourseService
  students: { name: string, id: number }[] = []


  constructor(instanceCourse: CourseService, dateService: DateService, @Inject("ENVIRONMENT") enviroment: string) {
    this.instanceCourse = instanceCourse
    this.instanceCourse.add("NestJS")

    console.log("Courses from Students", this.instanceCourse.courses, "at ", dateService.getCurrentDate());
    console.log("Current Environment:", enviroment);
  }

  add(name: string, course: { id?: number, title?: string }) {
    if (course.id && this.existsCourse(course.id)) {
      this.students.push({ name, id: course.id })
    }

    if (!course.id && course.title) {
      const newCourse = this.instanceCourse.add(course.title)
      this.students.push({ name, id: newCourse.id })
    }
  }

  private existsCourse(id: number): boolean {
    return this.instanceCourse.courses.some(it => it.id === id)
  }

  listStudentsByCourses() {
    return this.students.map(it => ({ ...it, courses: this.instanceCourse.courses.filter(el => el.id === it.id) }))
  }
}
