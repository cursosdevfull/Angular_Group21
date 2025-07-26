import { StatusEnum } from "../../../core/enums/status";

export type TSchedule = {
    scheduleId: number;
    courseId: number;
    title: string;
    status: StatusEnum
    startDate: string;
    duration: number;
    frequency: string;
}