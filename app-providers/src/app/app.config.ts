import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CourseService } from './course.service';
import { LogService } from './log.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    /*{
      provide: CourseService,
      useClass: CourseService
      // useValue: new CourseService()
    }*/
    CourseService,
    LogService,
    {
      provide: 'API_URL',
      useValue: 'https://api.example.com'
    },
    {
      provide: "CURRENT_ENVIRONMENT",
      useValue: "production"
    },
    {
      provide: 'APP_VERSION',
      useValue: '1.0.0'
    },
    {
      provide: "ENVIRONMENT",
      useFactory: (current: string) => {
        if (current === "production") {
          return "PRODUCTION";
        }

        if (current === "development") {
          return "DEVELOPMENT";
        }

        return "environment not defined";
      },
      deps: ["CURRENT_ENVIRONMENT"]
    }
  ]
};
