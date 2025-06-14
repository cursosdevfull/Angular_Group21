import { Component } from '@angular/core';

@Component({
  selector: 'cdev-course',
  templateUrl: './course.html',
  styleUrl: './course.css'
})
export class Course {
  title = "Courses";

  courses = [
    {
      id: 1,
      name: 'Angular Fundamentals',
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
}
