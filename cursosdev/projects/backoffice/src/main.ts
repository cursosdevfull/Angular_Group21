import { bootstrapApplication } from "@angular/platform-browser";
import { provideZonelessChangeDetection } from "@angular/core";
import { App } from './app/app/app';
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";


const config = {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes)
    ]
}

bootstrapApplication(App, config)