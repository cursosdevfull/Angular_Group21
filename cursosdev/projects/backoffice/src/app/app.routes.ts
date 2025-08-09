import { ActivatedRoute, Router, Routes, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { Login } from './domains/auth/component/login/login';
import { inject } from '@angular/core';
import { authenticationGuard } from './core/guards/authentication-guard';


export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        path: 'dashboard',
        canActivate: [authenticationGuard],
        loadComponent: () =>
            import('./domains/dashboard/components/dashboard/dashboard').then(
                (m) => m.Dashboard
            ),
    },
    {
        path: 'courses',
        canActivate: [authenticationGuard],
        loadComponent: () =>
            import('./domains/courses/components/course-list/course-list').then(
                (m) => m.CourseList
            ),
    },
    {
        path: 'schedules',
        canActivate: [authenticationGuard],
        loadComponent: () =>
            import('./domains/schedules/components/schedule-list/schedule-list').then(
                (m) => m.ScheduleList
            ),
    },
    {
        path: 'users',
        canActivate: [authenticationGuard],
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
