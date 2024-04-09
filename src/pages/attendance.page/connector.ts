import {RootStateType} from "src/types";
import {attendanceCRUDAction, projectTeamCRUDAction} from "src/store/action";
import {setDataAction} from "src/store/action/global.actions";

import {connect, ConnectedProps} from "react-redux";

const mapStateToProps = (state: RootStateType) => {
    let attendance = state.tablesReducer.attendance;
    let project_team = state.tablesReducer.project_team.LIST;
    if (attendance.LIST?.data)
        attendance = {
            ...attendance,
            LIST: {
                ...attendance.LIST,
                data: attendance.LIST.data.filter(attend => attend.project === state.authReducer.project)
            }
        }
    if (project_team && project_team.data)
        project_team = {
            ...project_team,
            data: project_team.data.filter(team => team.project === state.authReducer.project)
        }
    return {...attendance, team: project_team};
};

const mapDispatchToProps = {
    attendance: attendanceCRUDAction,
    project_team: projectTeamCRUDAction,
    set_data: setDataAction
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropType = ConnectedProps<typeof connector>;
