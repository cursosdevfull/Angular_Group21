import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "cdev-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent {
    constructor(private readonly router: Router) {
        console.log('LoginComponent initialized');
    }

    onLogin() {
        this.router.navigate(["/course"]);
        console.log('Login button clicked');
    }
}