import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: { id: number, name: string, description: string, duration: string, price: number }[] = [
    {
      id: 1,
      name: 'Angular Fundamentals PRO',
      description: 'Learn the basics of Angular framework.',
      duration: '3 weeks',
      price: 199.99
    },
    {
      id: 2,
      name: 'Advanced Angular',
      description: 'Deep dive into Angular features and best practices.',
      duration: '4 weeks',
      price: 299.99
    },
    {
      id: 3,
      name: 'Angular and TypeScript',
      description: 'Master TypeScript while building Angular applications.',
      duration: '5 weeks',
      price: 349.99
    }
  ]

  constructor() { }

  getCourses() {
    return [...this.courses];
  }

  addCourse(course: { id: number, name: string, description: string, duration: string, price: number }) {
    this.courses.push(course);
  }
}
