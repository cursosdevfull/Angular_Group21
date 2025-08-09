export interface CourseProps {
    courseId: number;
    name: string;
}

export class Course {
    courseId!: number;
    name!: string;

    constructor(props: Partial<CourseProps>) {
        Object.assign(this, props);
    }
}