import {ProjectTeamType} from "./project-team.type";

export type AttendanceType = {
    id: number;
    description: string;
    project: number;
    member: number;
    member_obj: ProjectTeamType;
    entry_time: string;
    exit_time: string;
    date: string;
}