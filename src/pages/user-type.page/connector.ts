import {RootStateType} from "src/types";
import {userTypeCRUDAction, featureCRUDAction} from "src/store/action";
import {setDataAction} from "src/store/action/global.actions";

import {connect, ConnectedProps} from "react-redux";

const mapStateToProps = (state: RootStateType) => {
    const feature = state.tablesReducer.feature.LIST;
    const user_type = state.tablesReducer.user_type;

    return {...user_type, feature}
};

const mapDispatchToProps = {
    feature_crud: featureCRUDAction,
    user_type_crud: userTypeCRUDAction,
    set_data: setDataAction
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropType = ConnectedProps<typeof connector>;
