import {Result} from "antd";

export default function NotPermissionPage() {
    return <Result
        status="403"
        title="403"
        subTitle="شما اجازه دسترسی به این صفحه را ندارید"
    />
}