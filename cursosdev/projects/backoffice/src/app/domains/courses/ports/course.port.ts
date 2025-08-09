import { Signal } from "@angular/core";
import { Course } from "../application/course";


export type CoursePort = {
    create(course: Course): Signal<Course | undefined>;
    update(course: Course): Signal<Course | undefined>;
    delete(courseId: number): Signal<void>;
    getAll(): Signal<Course[] | undefined>;
}