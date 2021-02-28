import {connect, ConnectedProps} from 'react-redux';
import {RootStateType} from "src/types";


const mapStateToProps = (state: RootStateType) => ({
    login: state.authReducer.status === 'ok',
    grade: state.authReducer.user?.grade!,
});

export const connector = connect(mapStateToProps);
export type ConnectorType = ConnectedProps<typeof connector>;
