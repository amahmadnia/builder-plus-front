import React, {Component} from "react";
import {connector, PropType} from './connector'
import {ProjectTeamEditableCell, Item, AttendanceEditableCellProps} from './project-team-editable.cell';
import Form, {FormInstance} from 'antd/lib/form';
import Table, {ColumnType, ColumnGroupType} from 'antd/lib/table';
import {persian} from "src/lib";
import {ProjectTeamType, AttendanceType} from "src/types";
import {Button, Input, Popconfirm, Select, Space} from "antd";
import {DatePicker, TimePicker} from 'antd-jalali';
import {DeleteOutlined, CheckOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons";
import dayjs, {Dayjs} from 'dayjs';

type ProjectTeamColumnsType = (Partial<AttendanceEditableCellProps> & (ColumnGroupType<Item> | ColumnType<Item>))

enum Posts {
    personnel = "پرسنل",
    "daily worker" = "کارگر روزمزد",
    contractor = "پیمانکار",
}


class ProjectTeamFormTablePage extends Component<PropType, { edit?: number, new: boolean, post?: ProjectTeamType['post'] }> {
    state = {edit: undefined, new: false, post: undefined};
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
            title: 'سمت',
            dataIndex: 'member',
            key: 'post',
            align: 'center',
            editable: true,
            InputNode: <Select options={
                [
                    {label: 'پرسنل', value: 'personnel'},
                    {label: 'پیمانکار', value: 'contractor'},
                    {label: 'کارگر روزمزد', value: 'daily worker'}
                ]
            }
                               onSelect={(value) => {
                                   this.setState({post: (value as ProjectTeamType['post'])})
                               }}
                               placeholder={'سمت'}
            />,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'نام',
            dataIndex: 'member',
            key: 'full_name',
            align: 'center',
            editable: true,
            InputNode: () => <Select
                options={this.props.team?.data?.filter((member) => member.post === this.state.post).map(member => ({
                    label: `${member.first_name} ${member.last_name}`,
                    value: member.id,
                }))}
                placeholder={'نام'}
            />,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'تاریخ',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
            editable: true,
            placeholder: 'تاریخ',
            render: (date) => persian(dayjs(date, 'YYYY-MM-DD').format('YYYY/MM/DD')),
            InputNode: <DatePicker style={{width: '100%'}} placeholder={'انتخاب تاریخ'} className="persian"/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'ساعت ورود',
            dataIndex: 'entry_time',
            key: 'entry_time',
            align: 'center',
            editable: true,
            render: (entry_time) => persian(dayjs(entry_time, 'HH:MM').format('HH:mm')),
            InputNode: <Input placeholder={"ساعت ورود"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'ساعت خروج',
            dataIndex: 'exit_time',
            key: 'exit_time',
            align: 'center',
            editable: true,
            render: (exit_time) => persian(dayjs(exit_time, 'HH:MM').format('HH:mm')),
            InputNode: <Input placeholder={"ساعت خروج"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: 'توضیحات',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
            editable: true,
            InputNode: <Input placeholder={"توضیحات"} className={'persian'}/>,
            formItemProps: {rules: [{required: true, message: ''}]},
        },
        {
            title: '',
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
            formItemProps: {rules: [{required: true, message: '',}]},
        }
    ]

    componentDidMount() {
        this.props.attendance({type: 'list'});
        this.props.project_team({type: 'list'});
    }

    componentDidUpdate(prevProps: Readonly<PropType>) {
        if (prevProps.POST?.status === 'loading' && this.props.POST!.status === 'ok') {

            this.props.set_data('attendance', 'LIST', [this.props.POST!.data, ...this.props.LIST!.data!])
            this.cancel()
        }
        if (prevProps.PATCH?.status === 'loading' && this.props.PATCH!.status === 'ok') {
            const data = [...this.props.LIST!.data!];
            const index = data.findIndex(attend => attend.id === this.props.PATCH!.data!.id);
            data[index] = this.props.PATCH!.data!;
            this.props.set_data('attendance', 'LIST', data)
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
        this.form.current?.resetFields();
        this.setState({edit: undefined, new: false});
    }

    add() {
        this.setState({new: true, edit: 0});
        this.form.current?.setFieldsValue({id: undefined});
        window.addEventListener('keydown', this.listener)

    }

    finish(values: Item) {
        if (values.id !== undefined)
            this.props.attendance({id: values.id, type: 'edit', data: values});
        else
            this.props.attendance({type: 'new', data: values});
    }

    onCell(col: ProjectTeamColumnsType, record: Item, index: number): AttendanceEditableCellProps {

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