import { inject, Injectable, Signal } from "@angular/core";
import { CoursePort } from "../ports/course.port";
import { Course } from "../application/course";
import { HttpClient } from "@angular/common/http";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable()
export class CourseAdapter implements CoursePort {
    http = inject(HttpClient);

    create(course: Course): Signal<Course | undefined> {
        return toSignal<Course | undefined>(this.http.post<Course>(`/api/courses`, course), { initialValue: undefined });
    }

    update(course: Course): Signal<Course | undefined> {
        return toSignal<Course | undefined>(this.http.put<Course>(`/api/courses/${course.courseId}`, course), { initialValue: undefined });
    }

    delete(courseId: number): Signal<Course | undefined> {
        return toSignal<Course | undefined>(this.http.delete<Course>(`/api/courses/${courseId}`), { initialValue: undefined });
    }

    getAll(): Signal<Course[] | undefined> {
        return toSignal<Course[] | undefined>(this.http.get<Course[]>(`/api/courses`), { initialValue: undefined });
    }
}