import { ActivatedRoute, Router, Routes, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { Login } from './domains/auth/component/login/login';
import { inject } from '@angular/core';


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
        path: 'users',
        loadComponent: () =>
            import('./domains/users/components/user-list/user-list').then(
                (m) => m.UserList
            ),
    },
    {
        path: "**",
        redirectTo: () => {
            //return "/login";
            const activedRoute = inject(ActivatedRoute);
            const previousRoute = activedRoute.snapshot.firstChild?.routeConfig?.path

            const urlTree = new UrlTree();
            urlTree.root = new UrlSegmentGroup([new UrlSegment('login', {})], {});
            urlTree.queryParams = { error: 'Page not found', 'timestamp': new Date().getTime(), 'status': 404, 'previousRoute': previousRoute || 'unknown' };
            return urlTree;


            /* return new Promise(resolve => {
                setTimeout(() => {
                    resolve("/login");
                }, 2000);
            }) */
        }
    }
];
