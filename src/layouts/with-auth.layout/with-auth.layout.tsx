import React from "react";
import {useHistory, Link} from 'react-router-dom';
import {Button, Col, Form, Image, Layout, Menu, Row, Select, Typography, PageHeader} from 'antd'
import * as AntIcon from '@ant-design/icons';
import styles from './with-auth.module.css'
import {convertPathToArray} from "src/lib";
import {RootStateType} from "src/types";
import {connect, ConnectedProps} from "react-redux";
import headerLogo from 'src/assets/images/logo/logo_7.png';
import sidebarLogo from 'src/assets/images/logo/why-logo.png';
import {logoutAction, projectCRUDAction, projectSelectAction} from "src/store/action";
import classNames from "classnames";

const pageName = {
    'baseline': 'خط مبنا',
    'project-team': 'نفرات کارفرما',
}

const mapStateToProps = (state: RootStateType) => ({
    grade: state.authReducer.user?.grade!,
    user: state.authReducer.user!,
    project: state.authReducer.project,
    projects: state.tablesReducer.project.LIST?.data?.map(project => ({label: project.title, value: project.id})),
});

const connector = connect(mapStateToProps, {
    logout: logoutAction,
    projectAction: projectCRUDAction,
    selectProject: projectSelectAction
});

type PropType = { children: React.ReactElement | React.ReactElement[] } & ConnectedProps<typeof connector>

const sidebarWidth = 200;
const sidebarCollapseWidth = 80;

function WithAuth({children, grade, logout, user, project, projects, projectAction, selectProject}: PropType) {
    const history = useHistory();

    const [path, setPath] = React.useState(convertPathToArray(history.location.pathname));

    const [collapse, setCollapse] = React.useState(false);

    React.useEffect(() => {
        if (!projects)
            projectAction({type: 'list'})
        return history.listen((location) => {
            setPath(convertPathToArray(location.pathname))
        });
    });

    return (
        <Layout>

            <Layout.Sider collapsible
                          collapsed={collapse}
                          onCollapse={setCollapse}
                          className={styles.sidebar}
                          collapsedWidth={sidebarCollapseWidth}
                          width={sidebarWidth}
            >
                <div className={styles.sidebarLogo}>
                    <Image src={sidebarLogo} className={styles.logoSidebarImage} preview={false}/>
                </div>
                <Form.Item className={styles.select_project} wrapperCol={{span: 24}}
                           label={'پروژه'} colon={false}>
                    <Select options={projects} loading={!projects} value={projects ? project : undefined}
                            placeholder={'پروژه'}
                            onChange={(value) => selectProject(value)}/>
                </Form.Item>

                <Menu mode="vertical" selectable={false} selectedKeys={path}
                      className={styles.siderMenu} title="منوی اصلی"
                      theme={'dark'}

                >

                    <Menu.Item key={'project-team'} icon={<AntIcon.UserOutlined/>}>
                        <Link to={'/project-team'}>
                            نفرات کارفرما
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={'baseline'} icon={<AntIcon.FieldTimeOutlined/>} disabled={!project}>
                        <Link to={'/baseline'}>
                            خط مبنا
                        </Link>
                    </Menu.Item>
                </Menu>
                <div className={styles.siderFooter}>

                    <Typography.Text className={styles.userSection}>
                        {user.first_name} {user.last_name}
                    </Typography.Text>
                    <Button danger type={'link'}
                            icon={<AntIcon.LogoutOutlined/>}
                            onClick={() => logout()}
                    >
                        خروج
                    </Button>

                </div>


            </Layout.Sider>


            <Layout style={{marginRight: collapse ? sidebarCollapseWidth : sidebarWidth}}
                    className={styles.innerLayout}>
                <Layout.Header className={styles.header}>
                    <div className={styles.logo}>
                        <Image src={headerLogo} height={'100%'} preview={false}/>
                    </div>

                    <Typography.Title level={4} className={classNames('bright', styles.pageTitle)}>
                        {
                            path[0] in pageName ? pageName[path[0] as keyof typeof pageName] : ''
                        }
                    </Typography.Title>
                </Layout.Header>

                <Layout.Content className={styles.content}>
                    {
                        children
                    }
                </Layout.Content>
            </Layout>


        </Layout>
    )
}

export default connector(WithAuth)