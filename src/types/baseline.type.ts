import {ProjectType} from "./project.type";

export type BaselineType = {
    id: number;
    start_date: string;
    finish_date: string;
    created_date: string;
    expiration_date: string;
    startup_progress: number;
    expiration_progress: number;
    project?: number;
    project_obj?: ProjectType;
    file?: File;
}