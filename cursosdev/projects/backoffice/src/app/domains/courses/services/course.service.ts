import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Paginate } from '../../../core/types/paginate';
import { BaseService } from "../../../core/interfaces/base-service";
import { Course } from "../models/course.model";

@Injectable()
export class CourseService implements BaseService<Course> {
    http = inject(HttpClient);

    getByPage(page: number): Signal<Paginate<Course> | undefined> {
        return toSignal<Paginate<Course> | undefined>(this.http.get<Paginate<Course>>(`/api/courses/paginated?page=${page}`), { initialValue: undefined });
    }
}