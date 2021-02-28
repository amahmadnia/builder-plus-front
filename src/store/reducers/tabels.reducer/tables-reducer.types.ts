import {CRUDReducerType} from "src/types/c-r-u-d-reducer.type";
import {ProjectTeamType} from "src/types/project-team.type";
import {BaselineType} from "src/types/baseline.type";
import {ProjectType} from "src/types/project.type";

export interface TablesReducerTypes {
    project: CRUDReducerType<ProjectType, ProjectType[]>;
    project_team: CRUDReducerType<ProjectTeamType, ProjectTeamType[], ProjectTeamType, ProjectTeamType>;
    baseline: CRUDReducerType<BaselineType, BaselineType[], BaselineType, BaselineType>;
}
