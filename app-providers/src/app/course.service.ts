import { Injectable } from "@angular/core";
import { LogService } from "./log.service"

@Injectable()
export class CourseService {
    constructor(log: LogService) {
        log.add("CourseService initialized");
    }

    courses: { id: number, title: string }[] = [
        { id: 1, title: "Angular" },
        { id: 2, title: "NestJS" },
        { id: 3, title: "Microfrontends" },
        { id: 4, title: "AWS CDK" }
    ]

    add(title: string) {
        const idMax = Math.max(...this.courses.map(it => it.id))

        const newCourse = { id: idMax + 1, title }
        this.courses.push(newCourse)



        return newCourse
    }
}