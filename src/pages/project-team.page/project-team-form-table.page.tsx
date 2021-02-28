import React, {Component} from "react";
import {connector, PropType} from './connector'
import {ProjectTeamEditableCell, Item, ProjectTeamEditableCellProps} from './project-team-editable.cell';
import Form, {FormInstance} from 'antd/lib/form';
import Table, {ColumnType, ColumnGroupType} from 'antd/lib/table';
import {persian} from "src/lib";
import {ProjectTeamType} from "src/types";
import {Button, Input, Popconfirm, Select, Space} from "antd";
import {DeleteOutlined, CheckOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons";

type ProjectTeamColumnsType = (Partial<ProjectTeamEditableCellProps> & (ColumnGroupType<Item> | ColumnType<Item>))

enum Posts {
    personnel = "پرسنل",
    "daily worker" = "کارگر روزمزد",
    contractor = "پیمانکار",
}


class ProjectTeamFormTablePage extends Component<PropType, { edit?: number, new: boolean }> {
    state = {edit: undefined, new: false}
    form = React.createRef<FormInstance>();
    columns: ProjectTeamColumnsType[] = [
        {
            title: 'شماره',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            editable: false,
        },
        {
            title: 'نام',
            dataIndex: 'first_name',
            key: 'first_name',
            align: 'center',
            editable: true,
            InputNode: <Input placeholder={"نام"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: 'نام را پر کنید'}]},
        },
        {
            title: 'نام خانوادگی',
            dataIndex: 'last_name',
            key: 'last_name',
            align: 'center',
            editable: true,
            placeholder: 'نام خانوادگی',
            InputNode: <Input placeholder={'نام خانوادگی'} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: 'نام خانوادگی را پر کنید'}]},
        },
        {
            title: 'شماره ملی',
            dataIndex: 'national_id',
            key: 'national_id',
            align: 'center',
            editable: true,
            render: (national_id) => persian(national_id),
            InputNode: <Input placeholder={"شماره ملی"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: 'شماره ملی را پر کنید'}]},
        },
        {
            title: 'شماره موبایل',
            dataIndex: 'phone_no',
            key: 'phone_no',
            align: 'center',
            editable: true,
            render: (national_id) => persian(national_id),
            InputNode: <Input placeholder={"شماره موبایل"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: 'شماره موبایل را پرکنید'}]},
        },
        {
            title: 'آدرس',
            dataIndex: 'address',
            key: 'address',
            align: 'center',
            editable: true,
            InputNode: <Input placeholder={"آدرس"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: 'آدرس را پر کنید'}]},
        },
        {
            title: 'سمت',
            dataIndex: 'post',
            key: 'post',
            align: 'center',
            editable: true,
            render: (post) => Posts[post as ProjectTeamType['post']],
            InputNode: <Select options={
                [
                    {label: 'پرسنل', value: 'personnel'},
                    {label: 'پیمانکار', value: 'contractor'},
                    {label: 'کارگر روزمزد', value: 'daily worker'}
                ]
            }
                               placeholder={'سمت'}
            />,
            formItemProps: {rules: [{required: true, message: 'سمت را انخاب کنید'}]},
        },
        {
            title: 'عملیات',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            editable: true,
            render: (id) => <Popconfirm
                title={'آیا از حذف این شخص مطمئن هستید؟'}
                onConfirm={() => this.props.project_team({
                    id,
                    type: 'delete',
                })}
                icon={<DeleteOutlined/>}
                disabled={this.props.DELETE?.status === 'loading'}
                okText='بله'
                cancelText='خیر'
            >
                <Button danger type="primary"
                        title='حذف پروژه'
                        loading={this.props.DELETE?.status === 'loading' && id === +this.props.DELETE?.data!}
                        icon={<DeleteOutlined/>}
                />
            </Popconfirm>,
            InputNode: () => <Space>
                <Button
                    icon={<CheckOutlined/>}
                    loading={[this.props.PATCH?.status, this.props.POST?.status].includes('loading')}
                    title={'ثبت'}
                    onClick={() => this.form.current?.submit()}
                />
                <Button
                    icon={<CloseOutlined/>}
                    danger
                    disabled={[this.props.PATCH?.status, this.props.POST?.status].includes('loading')}
                    title={'انصراف'}
                    onClick={this.cancel.bind(this)}
                />
            </Space>,
            formItemProps: {rules: [{required: true, message: 'سمت را انخاب کنید'}]},
        }
    ]

    componentDidMount() {
        this.props.project_team({type: 'list'});
    }

    componentDidUpdate(prevProps: Readonly<PropType>) {
        if (prevProps.POST?.status === 'loading' && this.props.POST!.status === 'ok') {

            this.props.set_data('project_team', 'LIST', [this.props.POST!.data, ...this.props.LIST!.data!])
            this.cancel()
        }
        if (prevProps.PATCH?.status === 'loading' && this.props.PATCH!.status === 'ok') {
            const data = [...this.props.LIST!.data!];
            const index = data.findIndex(person => person.id === this.props.PATCH!.data!.id);
            data[index] = this.props.PATCH!.data!;
            this.props.set_data('project_team', 'LIST', data)
            this.cancel()
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.listener);
    }

    listener = (event: KeyboardEvent) => {
        if (event.code === 'Escape')
            this.cancel()
        else if (event.code === 'Enter')
            this.form.current?.submit();
    }

    cancel() {
        window.removeEventListener('keydown', this.listener);
        this.setState({edit: undefined, new: false});
    }

    add() {
        this.setState({new: true, edit: 0});
        this.form.current?.setFieldsValue({id: undefined});
        window.addEventListener('keydown', this.listener)

    }

    finish(values: Item) {
        if (values.id !== undefined)
            this.props.project_team({id: values.id, type: 'edit', data: values});
        else
            this.props.project_team({type: 'new', data: values});
    }

    onCell(col: ProjectTeamColumnsType, record: Item, index: number): ProjectTeamEditableCellProps {

        return {
            dataIndex: col.dataIndex as string,
            title: col.title,
            editable: (index === this.state.edit && col.editable!),
            index,
            InputNode: col.InputNode,
            formItemProps: col.formItemProps,
        }
    }


    render() {
        const {LIST} = this.props;
        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: (record: Item, index: number) => this.onCell(col, record, index),

            }
        })
        return <Form component={false} ref={this.form} onFinish={this.finish.bind(this)}>
            <Table<Item>
                rowKey="id"
                components={{
                    body: {
                        cell: ProjectTeamEditableCell,
                    }
                }}
                onRow={(record, index) => ({
                    onClick: (event: any) => {
                        if ((!['TD', 'TR'].includes(event.target.tagName) || this.state.edit !== undefined))
                            return void 0;
                        this.setState({edit: index})
                        this.form.current?.setFieldsValue(record)
                        window.addEventListener('keydown', this.listener)
                    },
                    className: 'pointer'
                })}
                dataSource={this.state.new ? [{} as Item, ...(LIST?.data || [])] : LIST?.data}
                pagination={false}
                loading={LIST?.status !== 'ok'}
                columns={columns as any}
            />
            <Button icon={<PlusOutlined/>} type={'primary'}
                    disabled={this.state.edit !== undefined}
                    shape={'circle'}
                    size={"large"}
                    style={{position: 'fixed', left: 50, bottom: 50}}
                    onClick={() => this.add()}
            />
        </Form>
    }


}


export default connector(ProjectTeamFormTablePage);