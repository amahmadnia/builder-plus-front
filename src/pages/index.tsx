import React from 'react';
import {connector, ConnectorType} from './pages.connector';
import {WithAuth, WithoutAuthLayout} from "src/layouts";
import {Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./login.page/login.page";
import {NotFoundPage, NotPermissionModalPage, NotPermissionPage} from "./error.page";
import {ProjectTeamFormTablePage} from "./project-team.page";
import {BaselineTablePage, BaselineNewPage, BaselineEditPage, BaselineViewPage} from "./baseline.page";


const redirectTo = (grade: string) => {
    if (grade === 'admin' || grade === 'manager')
        return '/project';
    return '/report';
}
const adminOrManager = ['admin', 'manager'];
const Pages: React.FC<ConnectorType> = (props: ConnectorType) => {

    if (!props.login)
        return (
            <WithoutAuthLayout>
                <Switch>
                    <Route path='/login' component={LoginPage}/>
                    <Route>
                        <Redirect to={'/login'}/>
                    </Route>
                </Switch>
            </WithoutAuthLayout>
        );
    const grade = props.grade;
    return (
        <WithAuth>
            <Route path={'/'} render={() => (<Redirect to={redirectTo(grade)}/>)} exact={true}/>
            <Switch>


                <Route path={'/login'} render={() => (<Redirect to={'/'}/>)}/>
                <Route path={'/project-team'} component={ProjectTeamFormTablePage}/>
                <Route path={'/baseline'} component={BaselineTablePage}/>
                <Route component={NotFoundPage}/>
            </Switch>
            <Switch>
                <Route path={'/baseline/new'} component={BaselineNewPage}/>
                <Route path={'/baseline/:id/edit'} component={BaselineEditPage}/>
                <Route path={'/baseline/:id'} component={BaselineViewPage}/>
                {/*<Route path={'/task/new'} component={grade === 'admin' ? TaskNewPage : NotPermissionModalPage}/>*/}
                {/*<Route path={'/task/:id/edit'} component={grade === 'admin' ? TaskEditPage : NotPermissionModalPage}/>*/}
                {/*<Route path={'/task/:id'} component={TaskViewPage}/>*/}


            </Switch>

        </WithAuth>
    )

}

export default connector(Pages);