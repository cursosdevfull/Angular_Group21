export class Auth {
    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    properties() {
        return {
            email: this.email,
            password: this.password
        };
    }
}