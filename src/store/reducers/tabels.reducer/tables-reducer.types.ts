import {CRUDReducerType} from "src/types/c-r-u-d-reducer.type";
import {ProjectTeamType} from "src/types/project-team.type";
import {BaselineType} from "src/types/baseline.type";
import {ProjectType} from "src/types/project.type";
import {AttendanceType} from 'src/types/attendance.type';
import {CalendarType} from 'src/types/calendar.type';
import {FeatureType} from 'src/types/feature.type';
import {UserTypeType} from 'src/types/user-type.type';

export interface TablesReducerTypes {
    project: CRUDReducerType<ProjectType, ProjectType[]>;
    project_team: CRUDReducerType<ProjectTeamType, ProjectTeamType[], ProjectTeamType, ProjectTeamType>;
    baseline: CRUDReducerType<BaselineType, BaselineType[], BaselineType, BaselineType>;
    attendance: CRUDReducerType<AttendanceType, AttendanceType[], AttendanceType, AttendanceType>;
    calendar: CRUDReducerType<CalendarType, CalendarType[], CalendarType, CalendarType>;
    feature: CRUDReducerType<FeatureType, FeatureType[]>;
    user_type: CRUDReducerType<UserTypeType, UserTypeType[], UserTypeType, UserTypeType>;
}
