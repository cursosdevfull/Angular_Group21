export interface UserProps {
    userId: number;
    name: string;
    email: string;
    password: string;
}

export class User {
    userId!: number;
    name!: string;
    email!: string;
    password!: string;

    constructor(props: Partial<UserProps>) {
        Object.assign(this, props);
    }
}