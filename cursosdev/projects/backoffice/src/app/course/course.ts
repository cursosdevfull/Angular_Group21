import { Component } from '@angular/core';
import { CourseService } from '../course-service';

@Component({
  selector: 'cdev-course',
  templateUrl: './course.html',
  styleUrl: './course.css'
})
export class Course {
  title = "Courses";
  courseService: CourseService;

  courses: { id: number, name: string, description: string, duration: string, price: number }[] = [];

  constructor(courseService: CourseService) {
    this.courseService = courseService;
    this.courses = courseService.getCourses();
  }

  addCourse() {
    const newCourse = {
      id: this.courses.length + 1,
      name: 'New Course',
      description: 'Description of the new course',
      duration: '2 weeks',
      price: 99.99
    };
    this.courseService.addCourse(newCourse);
    this.courses = this.courseService.getCourses();
  }
}
