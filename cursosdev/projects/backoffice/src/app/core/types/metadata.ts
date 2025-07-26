import { Component } from "@angular/core";

type ItemMetadata<T> = {
    field: keyof T;
    label: string;
    component?: new (...args: any[]) => any;
}

export type Metadata<T> = ItemMetadata<T>[]