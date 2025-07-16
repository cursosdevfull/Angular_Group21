import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: "courses", loadComponent: () => import("./domains/courses/components/course-list/course-list").then(m => m.CourseList) },
]