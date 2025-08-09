import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Paginate } from '../../../core/types/paginate';
import { User } from "../models/user.model";
import { BaseService } from "../../../core/interfaces/base-service";

@Injectable()
export class UserService implements BaseService<User> {
    http = inject(HttpClient);

    getByPage(page: number): Signal<Paginate<User> | undefined> {
        return toSignal<Paginate<User> | undefined>(this.http.get<Paginate<User>>(`/api/users/paginated?page=${page}`), { initialValue: undefined });
    }
}