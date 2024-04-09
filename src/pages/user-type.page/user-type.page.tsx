import React from "react";
import {connector, PropType} from './connector';
import {Layout, Button, PageHeader, Menu, message, Space, Spin} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {UserTypeActionType, UserTypeType} from "src/types";
import {UserTypeSection} from "./user-type.section";

interface StateType {
    new?: Partial<UserTypeType>,
    select: number;
}

class UserTypePage extends React.Component<PropType, StateType> {

    state = {new: undefined, select: 0};

    componentDidMount() {
        this.props.user_type_crud({type: "list"});
        this.props.feature_crud();
    }

    componentDidUpdate(prevProps: Readonly<PropType>) {
        if (prevProps.POST?.status === 'loading' && this.props.POST!.status === 'ok') {
            this.props.set_data('user_type', 'LIST', [...this.props.LIST!.data!, this.props.POST!.data]
            );
            message.success({content: 'عملیات با موفقیت به پایان رسید', key: 'user-type', duration: 3}, 1000);
        }
        if (this.props.LIST?.data !== prevProps.LIST?.data)
            this.setState({new: undefined});

        if (prevProps.PATCH?.status === 'loading' && this.props.PATCH!.status === 'ok') {
            const list = [...this.props.LIST!.data!];
            const index = list.findIndex(item => item.id === this.props.PATCH!.data!.id)
            list[index] = this.props.PATCH!.data!;

            this.props.set_data('user_type', 'LIST', list
            );
            message.success({content: 'عملیات با موفقیت به پایان رسید', key: 'user-type', duration: 3}, 1000);
        }

    }

    new_user_type = () => {
        this.setState({new: {title: '', type_actions: []}, select: this.props.LIST!.data?.length || 0})
    }

    select_user_type = (event: any) => {
        const select = +event.key.split('_')[1];
        this.setState({select, new: undefined})
    }

    onFinish = (values: any) => {
        const type_actions: Partial<UserTypeActionType>[] = [];
        const i_ds: { [key: string]: number } = {};
        if (this.state.new === undefined && this.props.LIST!.data?.length) {
            this.props.LIST!.data[this.state.select].type_actions.forEach(action => {
                i_ds[`${action.feature}_${action.type}`] = action.id;
            });
        }
        Object.entries(values).forEach(entry => {
            if (entry[0] === 'title' || entry[1] == 'none')
                return;
            const [feature, type] = entry[0].split('_');
            type_actions.push({
                feature: +feature,
                type: (type as UserTypeActionType['type']),
                permission: (entry[1] as UserTypeActionType['permission'])
            });
            if (entry[0] in i_ds) {
                type_actions[type_actions.length - 1].id = i_ds[entry[0]];
            }
        });
        if (this.state.new)
            this.props.user_type_crud({
                type: 'new',
                data: ({
                    title: (values.title as string),
                    type_actions: (type_actions as UserTypeActionType[]),

                } as UserTypeType),
            });
        else {
            this.props.user_type_crud({
                type: 'edit',
                data: ({
                    title: (values.title as string),
                    type_actions: (type_actions as UserTypeActionType[]),
                } as UserTypeType),
                id: this.props.LIST!.data![this.state.select].id,
            });
        }
        message.loading({content: 'عملیات در حال انجام', key: 'user-type'})
    }

    render() {
        const {LIST, feature} = this.props;
        const user_types = LIST?.data || []
        const menu = [...user_types]
        const new_user_type = this.state.new;
        const update_loading = this.props.PATCH?.status === 'loading' || this.props.POST?.status === 'loading';
        const page_loading = this.props.LIST?.status === 'loading' && this.props.feature!.status === 'loading';
        if (new_user_type)
            menu.push(new_user_type);

        return (
            <Layout>
                <Layout className={'user-type--header'}>
                    <PageHeader
                        title={'سمت های شغلی'}
                        extra={[
                            <Button
                                type={"primary"}
                                icon={<PlusOutlined/>}
                                onClick={this.new_user_type}
                                disabled={new_user_type}
                                loading={update_loading}
                            >
                                تعریف سمت جدید
                            </Button>
                        ]}
                        style={{height: '100%'}}
                    >
                    </PageHeader>
                </Layout>
                <Layout.Content>
                    <Layout style={{backgroundColor: 'white', padding: 24}}>
                        <Layout.Sider width={250} theme={'light'}
                                      className={'user-type--sider'}
                        >
                            <Menu
                                mode={"inline"}
                                theme={'light'}
                                inlineCollapsed={false}
                                onSelect={this.select_user_type}
                                className={'user-type--menu'}
                                selectedKeys={['menu_' + this.state.select]}
                            >

                                {page_loading || (user_types.length && !menu) ?
                                    <Space style={{justifyContent: 'center', display: "flex"}}>
                                        <Spin/>
                                    </Space> :
                                    menu.map((user_type, index) => (
                                        <Menu.Item
                                            key={`menu_${index}`}
                                        >
                                            <div className={'user-type--top-left'}/>
                                            {user_type.title === '' ? 'سمت شغلی جدید' : user_type.title}
                                            <div className={'user-type--bottom-left'}/>
                                        </Menu.Item>
                                    ))
                                }
                            </Menu>
                        </Layout.Sider>

                        <Layout.Content className={'user-type--content'}>
                            {LIST?.status === 'ok' && feature?.status === 'ok' ?
                                <UserTypeSection
                                    features={feature!.data!}
                                    user_type={LIST.data![this.state.select] || new_user_type}
                                    onfinish={this.onFinish}
                                    loading={update_loading}
                                /> : <Space style={{justifyContent: 'center', display: "flex"}}>
                                    <Spin/>
                                </Space>}
                        </Layout.Content>
                    </Layout>
                </Layout.Content>
            </Layout>
        );
    }
}


export default connector(UserTypePage)