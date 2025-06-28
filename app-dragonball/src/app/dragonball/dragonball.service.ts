import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environment";
import { DragonballPage } from './interfaces/page.interface';
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: "root",
})
export class DragonballService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl


    private characters$ = toSignal<DragonballPage | undefined>(this.getCharactersByPage(0, 10), { initialValue: undefined });


    private getCharactersByPage(page: number, limit: number) {
        return this.http.get<DragonballPage>(`${this.apiUrl}/characters?page=${page}&limit=${limit}`);
    }

}