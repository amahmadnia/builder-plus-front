import React from 'react';
import {
    Button,
    Drawer,
    Form,
    Row,
    Col,
    Space,
    InputNumber
} from 'antd';
import {FormInstance} from 'antd/lib/form';
import {BaselineType, RootStateType} from "src/types";
import {connect, ConnectedProps} from "react-redux";
import {baselineCRUDAction} from "src/store/action";
import {RouteChildrenProps} from "react-router-dom";
import {DatePicker} from 'antd-jalali';
import dayjs, {Dayjs} from "dayjs";
import {InputFile} from "src/components";


const mapStateToProps = (state: RootStateType) => {
    const list: Partial<typeof state["tablesReducer"]["baseline"]["POST"]> = {data: undefined, status: undefined};
    return (
        {
            ...(state.tablesReducer.baseline.POST || list),
            project: state.authReducer.project,
        }
    )
};


const connector = connect(mapStateToProps, {
    baselineActions: baselineCRUDAction,
});
type PropsType = ConnectedProps<typeof connector> & RouteChildrenProps<{ id: string }>;


class ProjectNewPage extends React.PureComponent<PropsType, { show: boolean }> {
    today = dayjs(new Date());
    form = React.createRef<FormInstance>();
    state = {show: false};
    onClose = (replace?: string) => {
        if (this.props.status === 'loading')
            return
        this.setState({show: false})
        setTimeout(() => {
            if (replace)
                this.props.history.replace(replace);
            else
                this.props.history.goBack();
        }, 300)
    }

    onFinish = (values: BaselineType & { start_date: Dayjs, finish_date: Dayjs, created_date: Dayjs, expiration_date: Dayjs }) => {
        this.props.baselineActions({
            data: {
                ...values,
                // @ts-ignore
                start_date: values.start_date.calendar('gregory').format('YYYY-MM-DD'),
                // @ts-ignore
                finish_date: values.finish_date.calendar('gregory').format('YYYY-MM-DD'),
                // @ts-ignore
                created_date: values.created_date.calendar('gregory').format('YYYY-MM-DD'),
                // @ts-ignore
                expiration_date: values.expiration_date.calendar('gregory').format('YYYY-MM-DD'),
                project: this.props.project,
                file: this.form.current?.getFieldInstance('file')?.input.files?.[0]
            }, type: 'new'
        });
    }

    Footer = () => (
        <Space>
            <Button onClick={() => this.onClose()}
                    disabled={this.props.status === 'loading'}
            >
                انصراف
            </Button>
            <Button loading={this.props.status === 'loading'}
                    type="primary"
                    onClick={() => this.form.current?.submit()}
            >
                ثبت
            </Button>
        </Space>
    )

    componentDidMount() {
        this.setState({show: true});
    }

    componentDidUpdate(prevProps: Readonly<PropsType>) {
        if (prevProps.status === 'loading' && this.props.status === 'ok') {
            this.props.baselineActions({type: 'list'});
            this.props.baselineActions({type: 'one', id: this.props.data!.id})
            this.onClose(`/baseline/${this.props.data!.id}`);
        }
    }


    render() {
        return (<Drawer
            title="ایجاد خط مبنا"
            width={"400"}
            onClose={() => this.onClose()}
            visible={this.state.show}
            bodyStyle={{paddingBottom: 80}}
            footer={<this.Footer/>}
            placement={'left'}
        >
            <Form layout="vertical"
                  hideRequiredMark ref={this.form}
                  onFinish={this.onFinish}
            >
                <Row gutter={16}>
                    <Col span={24}>

                        <InputFile
                            inputProps={{accept: '*.csv'}}
                            buttonProps={{style: {margin: "15px 0"}}}
                            formItemProps={{
                                name: "file",
                                label: "فایل csv",
                                rules: [{required: true, message: 'فایل فعالیت ها را انتخاب کنید'}]
                            }}
                            placeholder={'انتخاب فایل'}
                        />
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="start_date"
                            label="تاریخ شروع"
                            rules={[{
                                required: true,
                                message: 'لطفا تاریخ را انتخاب کنید',
                            }]}
                        >
                            <DatePicker style={{width: '100%'}} placeholder={'انتخاب تاریخ'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="finish_date"
                            label="تاریخ پایان"
                            rules={[{
                                required: true,
                                message: 'لطفا تاریخ را انتخاب کنید',
                            }]}
                        >
                            <DatePicker style={{width: '100%'}} placeholder={'انتخاب تاریخ'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="created_date"
                            label="تاریخ ایجاد"
                            rules={[{
                                required: true,
                                message: 'لطفا تاریخ را انتخاب کنید',
                            }]}
                        >
                            <DatePicker style={{width: '100%'}} placeholder={'انتخاب تاریخ'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="expiration_date"
                            label="تاریخ ابطال"
                            rules={[{
                                required: true,
                                message: 'لطفا تاریخ را انتخاب کنید',
                            }]}
                        >
                            <DatePicker style={{width: '100%'}} placeholder={'انتخاب تاریخ'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="startup_progress"
                            label="پیشرفت اولیه"
                            rules={[{required: true, message: 'پیشرفت اولیه را پر کنید'}]}
                        >
                            <InputNumber
                                placeholder="پیشرفت اولیه"
                                style={{width: '100%', fontFamily: 'iranyekan'}}
                                min={0}
                                max={100}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="expiration_progress"
                            label="پیشرفت نهایی"
                            rules={[{required: true, message: 'پیشرفت نهایی را پر کنید'}]}
                        >
                            <InputNumber
                                placeholder="پیشرفت نهایی"
                                style={{width: '100%', fontFamily: 'iranyekan'}}
                                min={0}
                                max={100}
                            />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Drawer>)
    }

}


export default connector(ProjectNewPage);