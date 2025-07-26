import { Routes } from '@angular/router';
import { Login } from './domains/auth/component/login/login';

export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        path: 'courses',
        loadComponent: () =>
            import('./domains/courses/components/course-list/course-list').then(
                (m) => m.CourseList
            ),
    },
    {
        path: 'schedules',
        loadComponent: () =>
            import('./domains/schedules/components/schedule-list/schedule-list').then(
                (m) => m.ScheduleList
            ),
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
