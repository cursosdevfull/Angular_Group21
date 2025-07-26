import { InjectionToken } from "@angular/core";
import { LayoutConfig } from "./layout-config";

export const layoutToken = new InjectionToken<LayoutConfig>('layoutConfig');