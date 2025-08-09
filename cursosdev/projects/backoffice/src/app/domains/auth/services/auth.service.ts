import { inject, Injectable, Signal } from "@angular/core";
import { Auth } from "../models/auth.model";
import { HttpClient } from "@angular/common/http";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { Tokens } from '../../../core/types/tokens';

@Injectable()
export class AuthService {
    http = inject(HttpClient);

    login(auth: Auth): Signal<Tokens | undefined> {
        return toSignal<Tokens | undefined>(this.http.post<{ data: Tokens }>("/api/auth/login", auth.properties()).pipe(
            map(resp => resp.data)
        ), { initialValue: undefined });
    }
}