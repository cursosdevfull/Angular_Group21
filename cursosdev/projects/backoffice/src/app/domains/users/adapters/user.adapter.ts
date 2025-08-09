import { inject, Injectable, Signal } from "@angular/core";
import { UserPort } from "../ports/user.port";
import { User } from "../application/user";
import { HttpClient } from "@angular/common/http";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable()
export class UserAdapter implements UserPort {
    http = inject(HttpClient);

    create(user: User): Signal<User | undefined> {
        return toSignal<User | undefined>(this.http.post<User>(`/api/users`, user), { initialValue: undefined });
    }

    update(user: User): Signal<User | undefined> {
        return toSignal<User | undefined>(this.http.put<User>(`/api/users/${user.userId}`, user), { initialValue: undefined });
    }

    delete(userId: number): Signal<User | undefined> {
        return toSignal<User | undefined>(this.http.delete<User>(`/api/users/${userId}`), { initialValue: undefined });
    }

    getAll(): Signal<User[] | undefined> {
        return toSignal<User[] | undefined>(this.http.get<User[]>(`/api/users`), { initialValue: undefined });
    }
}