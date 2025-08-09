import { Signal } from "@angular/core";
import { User } from "../application/user";


export type UserPort = {
    create(user: User): Signal<User | undefined>;
    update(user: User): Signal<User | undefined>;
    delete(userId: number): Signal<void>;
    getAll(): Signal<User[] | undefined>;
}