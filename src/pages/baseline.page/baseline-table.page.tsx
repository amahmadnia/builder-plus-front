import React from 'react';
import {Link, RouteChildrenProps} from 'react-router-dom';
import dayjs from 'dayjs';
import {Button, Popconfirm, Progress, Space, Table} from 'antd';
import {EditOutlined, FileAddOutlined, FileExcelOutlined} from "@ant-design/icons";
import {BaselineType, RootStateType} from "src/types";
import {persian} from "src/lib";
import {connect, ConnectedProps} from "react-redux";
import {baselineCRUDAction} from "src/store/action";

const mapStateToProps = (state: RootStateType) => {
    const list: Partial<typeof state["tablesReducer"]["baseline"]["LIST"]> = {};
    const data = state.tablesReducer.baseline.LIST?.data?.filter(baseline => baseline.project_obj!.id === state.authReducer.project)
    return ({
        ...(state.tablesReducer.baseline.LIST || list),
        data,
        delete_data: state.tablesReducer.baseline.DELETE,
        grade: state.authReducer.user!.grade!
    })
};
const connector = connect(mapStateToProps, {actions: baselineCRUDAction});
type PropsType = ConnectedProps<typeof connector> & RouteChildrenProps;
type StateType = any;

interface TableInterface extends BaselineType {

}


class BaselineTablePage extends React.Component<PropsType, StateType> {

    date_render = (date: string) => persian(dayjs(date, 'YYYY-MM-DD').format('YYYY/MM/DD'));

    date_sorter(name: 'start_date' | 'finish_date' | 'created_date' | 'expiration_date') {
        return (s1: TableInterface, s2: TableInterface) => (
            dayjs(s1[name], 'YYYY-MM-DD').unix() - dayjs(s2[name], 'YYYY-MM-DD').unix())
    };

    progress_render = (progress: string | number) => <Progress type={'dashboard'} percent={Math.round(+progress)}
                                                               width={50}/>

    number_sorter(name: 'startup_progress' | 'expiration_progress') {
        return (s1: TableInterface, s2: TableInterface) => s1[name] - s2[name]

    }

    componentDidMount() {
        this.props.actions({type: 'list'});
    }

    render() {
        const {data, delete_data, actions, status} = this.props;
        return (
            <React.Fragment>
                <Link type="primary" to="/baseline/new" style={{marginBottom: 16}}
                      className="ant-btn ant-btn-primary ant-btn-rtl">
                    <FileAddOutlined style={{marginLeft: 5}}/>
                    افزودن خط مبنا
                </Link>
                <Table<TableInterface> dataSource={data}
                                       onRow={(record) => ({
                                           onClick: (event) => {
                                               // @ts-ignore
                                               if ((!['TD', 'TR'].includes(event.target.tagName)))
                                                   return void 0;
                                               this.props.history.push(`/baseline/${record.id}`)
                                           },
                                           className: 'pointer'
                                       })}
                                       pagination={false}
                                       loading={status === 'loading'}
                >
                    <Table.Column
                        title="تاریخ شروع"
                        dataIndex="start_date"
                        key="start_date"
                        align="center"
                        render={this.date_render}
                        sorter={this.date_sorter('start_date')}
                    />
                    <Table.Column
                        title="تاریخ پایان"
                        dataIndex="finish_date"
                        key="finish_date"
                        align="center"
                        render={this.date_render}
                        sorter={this.date_sorter('finish_date')}
                    />
                    <Table.Column
                        title="پیشرفت اولیه"
                        dataIndex="startup_progress"
                        key="startup_progress"
                        align="center"
                        render={this.progress_render}
                        sorter={this.number_sorter('startup_progress')}
                    />
                    <Table.Column
                        title="پیشرفت نهایی"
                        dataIndex="expiration_progress"
                        key="expiration_progress"
                        align="center"
                        render={this.progress_render}
                        sorter={this.number_sorter('expiration_progress')}
                    />
                    <Table.Column
                        title="تاریخ ایجاد"
                        dataIndex="created_date"
                        key="created_date"
                        align="center"
                        render={this.date_render}
                        sorter={this.date_sorter('created_date')}
                    />
                    <Table.Column
                        title="تاریخ ابطال"
                        dataIndex="expiration_date"
                        key="expiration_date"
                        align="center"
                        render={this.date_render}
                        sorter={this.date_sorter('expiration_date')}
                    />
                    <Table.Column

                        title="عملیات ها"
                        dataIndex="id"
                        key="id"
                        align="center"
                        render={(id: number) => (
                            <Space>
                                <Button type="primary" shape={'circle'}
                                        title='ویرایش فعالیت'
                                >
                                    <Link to={`/baseline/${id}/edit`}>
                                        <EditOutlined/>
                                    </Link>
                                </Button>


                                <Popconfirm title={'آیا از حذف این خط مبنا مطمئن هستید؟'}
                                            onConfirm={() => actions({
                                                id,
                                                type: 'delete',
                                            })}
                                            icon={<FileExcelOutlined/>}
                                            disabled={delete_data?.status === 'loading' && id === +delete_data?.data!}
                                            okText='بله'
                                            cancelText='خیر'
                                >
                                    <Button danger type="primary" shape={"circle"}
                                            title='حذف خط مبنا'
                                            loading={delete_data?.status === 'loading' && id === +delete_data?.data!}
                                            icon={<FileExcelOutlined/>}
                                    />
                                </Popconfirm>

                            </Space>
                        )
                        }
                    />

                </Table>
            </React.Fragment>);
    }
}


export default connector(BaselineTablePage);


