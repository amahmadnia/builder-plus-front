import {RootStateType} from "src/types";
import {projectTeamCRUDAction} from "src/store/action";
import {setDataAction} from "src/store/action/global.actions";

import {connect, ConnectedProps} from "react-redux";

const mapStateToProps = (state: RootStateType) => {
    const project_team = state.tablesReducer.project_team;

    return project_team;
};

const mapDispatchToProps = {
    project_team: projectTeamCRUDAction,
    set_data: setDataAction
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropType = ConnectedProps<typeof connector>;
