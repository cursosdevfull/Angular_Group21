import { bootstrapApplication } from "@angular/platform-browser";
import { importProvidersFrom, provideZonelessChangeDetection } from "@angular/core";
import { App } from './app/app/app';
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { LayoutModule } from "./app/shared/modules/layout/layout";
import { LAYOUT_DEFAULT } from "./app/shared/modules/layout/layout-default";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { baseUrlInterceptor } from "./app/core/interceptors/base-url";

const config = {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes),
        importProvidersFrom(LayoutModule.forRoot(LAYOUT_DEFAULT)),
        provideHttpClient(withFetch(), withInterceptors([baseUrlInterceptor])),
    ]
}

bootstrapApplication(App, config)