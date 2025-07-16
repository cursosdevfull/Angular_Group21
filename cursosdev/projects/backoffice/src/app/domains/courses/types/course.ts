import { StatusEnum } from "../../../core/enums/status";

export type TCourse = {
    courseId: number;
    title: string;
    status: StatusEnum
}