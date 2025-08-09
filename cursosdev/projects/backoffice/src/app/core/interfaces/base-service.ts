import { Signal } from "@angular/core";
import { Paginate } from "../types/paginate";

export interface BaseService<T> {
    getByPage(page: number): Signal<Paginate<T> | undefined>;
}