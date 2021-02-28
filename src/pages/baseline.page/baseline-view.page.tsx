import React from "react";
import {Button, Col, Drawer, Popconfirm, Row, Spin, Space} from 'antd';
import {connect, ConnectedProps} from "react-redux";
import {date_render, persian} from "src/lib";
import {DescriptionItem} from 'src/components';
import {RootStateType} from "src/types";
import {RouteChildrenProps} from 'react-router-dom';
import {baselineCRUDAction} from "src/store/action";
import {FileExcelOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom';

const mapStateToProps = (state: RootStateType) => {
    const list: Partial<typeof state["tablesReducer"]["baseline"]["GET"]> = {};
    return ({
        ...(state.tablesReducer.baseline.GET || list),
        delete_data: state.tablesReducer.baseline.DELETE,
        grade: state.authReducer.user!.grade!
    })
};
const connector = connect(mapStateToProps, {crud: baselineCRUDAction});

type PropsType = ConnectedProps<typeof connector> & RouteChildrenProps<{ id: string }>;


const BaselineViewPage: React.FC<PropsType> = ({data = {}, status, match, history, crud, delete_data = {}, grade}) => {
        const [show, setShow] = React.useState<boolean | null>(null);

        const onClose = () => {
            setShow(false);
            setTimeout(() => {
                history.goBack();
            }, 300)
        };
        React.useEffect(() => {
            if (status === 'ok' && delete_data?.status === 'ok' && +delete_data!.data! === +match!.params.id && show)
                return onClose()

            if (
                [undefined, 'error'].includes(status) ||
                (status === 'ok' &&
                    data!.id !== parseInt(match?.params.id || '-1'))) {
                crud({type: 'one', id: +match!.params.id!});
            }
            if (show === null) {
                setShow(true);
            }

        })

        return (
            <Drawer
                placement="left"
                closable={false}
                onClose={onClose}
                visible={show!}
                width={400}
                title={<div style={{justifyContent: "space-between", display: 'flex', alignItems: 'center'}}>
                    اطلاعات خط مبنا
                    <Space>
                        <Button
                            type={'primary'} disabled={status !== 'ok'}
                        ><Link to={`/baseline/${data!.id}/edit`}>ویرایش</Link></Button>
                        <Popconfirm title={'آیا از حذف این خط مبنا مطمئن هستید؟'}
                                    onConfirm={() => crud({
                                        id: +match?.params.id!,
                                        type: 'delete',
                                    })}
                                    icon={<FileExcelOutlined/>}
                                    disabled={delete_data?.status === 'loading' || status !== 'ok'}
                                    okText='بله'
                                    cancelText='خیر'
                        >
                            <Button danger type="primary"
                                    title='حذف خط مبنا'
                                    loading={delete_data?.status === 'loading'}
                                    disabled={status !== 'ok'}
                                    children="حذف"

                            />
                        </Popconfirm>
                    </Space>
                </div>}
            >
                {status !== 'ok' ?
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
                    <React.Fragment>
                        <Row gutter={[0, 35]}>
                            <Col span={12}>
                                <DescriptionItem title="تاریخ شروع" content={date_render(data!.start_date!)}/>
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="تاریخ پایان" content={date_render(data!.finish_date!)}/>
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="تاریخ ایجاد" content={date_render(data!.created_date!)}/>
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="تاریخ ابطال" content={date_render(data!.expiration_date!)}/>
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="پیشرفت اولیه"
                                                 content={persian(Math.round(data!.startup_progress || 0))}/>
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="پیشرفت نهایی"
                                                 content={persian(Math.round(data!.expiration_progress || 0))}/>
                            </Col>
                        </Row>
                    </React.Fragment>
                }
            </Drawer>
        )
    }
;


export default connector(BaselineViewPage);