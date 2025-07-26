import { Inject, Injectable, signal } from "@angular/core";
import { LayoutConfig } from "./layout-config";
import { layoutToken } from "./layout-token";

@Injectable()
export class LayoutService {
    header = signal(true);
    menu = signal(true);

    constructor(@Inject(layoutToken) private readonly config: LayoutConfig) {
        this.updateLayoutConfig(config);
    }

    updateLayoutConfig(config: LayoutConfig) {
        this.header.set(config.header);
        this.menu.set(config.menu);
    }

    changeConfigLayout(config: Partial<LayoutConfig>) {
        this.updateLayoutConfig({ ...this.config, ...config });
    }
}