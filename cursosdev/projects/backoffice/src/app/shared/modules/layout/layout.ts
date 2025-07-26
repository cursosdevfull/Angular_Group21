import { ModuleWithProviders, NgModule } from "@angular/core";
import { LayoutConfig } from "./layout-config";
import { layoutToken } from "./layout-token";
import { LayoutService } from "./layout.service";

@NgModule()
export class LayoutModule {
    static forRoot(config: LayoutConfig): ModuleWithProviders<LayoutModule> {
        return {
            ngModule: LayoutModule,
            providers: [
                { provide: layoutToken, useValue: config },
                LayoutService
            ]
        };
    }
}