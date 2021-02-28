import React from 'react';
import {Result, Modal, Button} from "antd";
import {RouteChildrenProps} from 'react-router-dom';

export default function NotPermissionPage(props: RouteChildrenProps<any>) {
    const [show, setShow] = React.useState<null | boolean>(null);
    const location = props.location.pathname.split(/\//);
    location.pop();
    React.useEffect(() => {
        if (show === null)
            setShow(true);
    });
    return (
        <Modal visible={!!show} closable={false} footer={false}>
            <Result
                status="403"
                title="403"
                subTitle="شما اجازه دسترسی به این صفحه را ندارید"
                extra={<Button type={'primary'} onClick={() => {
                    props.history.replace(location.join('/'))
                }}>تایید و بازگشت به جدول</Button>}
            />
        </Modal>
    )
}