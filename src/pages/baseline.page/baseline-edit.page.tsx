import React from 'react';
import {
    Button,
    Drawer,
    Form,
    Row,
    Col,
    Space,
    InputNumber, Spin
} from 'antd';
import {FormInstance} from 'antd/lib/form';
import {BaselineType, RootStateType} from "src/types";
import {connect, ConnectedProps} from "react-redux";
import {baselineCRUDAction} from "src/store/action";
import {RouteChildrenProps} from "react-router-dom";
import {DatePicker} from 'antd-jalali';
import dayjs, {Dayjs} from "dayjs";


const mapStateToProps = (state: RootStateType) => {
    const list: Partial<typeof state["tablesReducer"]["baseline"]["PATCH"]> = {data: undefined, status: undefined};
    return (
        {
            ...(state.tablesReducer.baseline.PATCH || list),
            baseline: state.tablesReducer.baseline.GET,
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
            }, type: 'edit', id: +this.props.match!.params.id!
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
        this.props.baselineActions({type: 'one', id: +this.props.match!.params.id!})
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
        const {baseline} = this.props;
        const {
            expiration_date,
            start_date,
            created_date,
            finish_date,
            startup_progress,
            expiration_progress
        } = baseline?.data || {}
        return (<Drawer
            title="ویرایش خط مبنا"
            width={"400"}
            onClose={() => this.onClose()}
            visible={this.state.show}
            bodyStyle={{paddingBottom: 80}}
            footer={<this.Footer/>}
            placement={'left'}
        >
            {
                baseline?.status !== 'ok' ?
                    <Row gutter={16}>
                        <Col span={24} style={{
                            textAlign: 'center',
                            display: 'flex',
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}>
                            <Spin style={{margin: "auto"}}/>
                        </Col>
                    </Row> :


                    <Form layout="vertical"
                          hideRequiredMark ref={this.form}
                          onFinish={this.onFinish}
                          initialValues={{
                              start_date: dayjs(start_date, 'YYYY-MM-DD'),
                              finish_date: dayjs(finish_date, 'YYYY-MM-DD'),
                              created_date: dayjs(created_date, 'YYYY-MM-DD'),
                              expiration_date: dayjs(expiration_date, 'YYYY-MM-DD'),
                              startup_progress,
                              expiration_progress
                          }}
                    >
                        <Row gutter={16}>
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
            }
        </Drawer>)
    }

}


export default connector(ProjectNewPage);