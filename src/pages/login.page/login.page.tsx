import React from "react";
import {Button, Checkbox, Form, Image, Input} from "antd";
import {connect, ConnectedProps} from "react-redux";
import {RootStateType} from "src/types";
import {loginAction} from "src/store/action";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import styles from './login-page.module.css';
import logo from 'src/assets/images/logo/logo_7.png';

const mapStateToProps = (state: RootStateType) => ({
    message: state.authReducer.message,
    status: state.authReducer.status,
})

const connector = connect(mapStateToProps, {login: loginAction});
type PropsType = ConnectedProps<typeof connector>;

const LoginPage: React.FC<PropsType> = ({login, status, message}) => {
    const onFinish = ({username, password, remember}: any) => {
        login({username, password, remember})
    }
    return (
        <Form
            name="normal_login"
            className={styles.loginForm}
            initialValues={{remember: true}}
            onFinish={onFinish}

        >
            <div>
                <Image preview={false} src={logo}/>
            </div>
            <Form.Item
                name="username"
                rules={[{required: true, message: 'لطفا نام کاربری خود را وارد کنید'}]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="نام کاربری"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{required: true, message: 'لطفا رمز عبور خود را وارد کنید'}]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="رمز عبور"
                />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>مرا به خاطر بسپار</Checkbox>
                </Form.Item>

                {/*<a className={styles.loginFormForgot} href="">*/}
                {/*    بازیابی پسورد*/}
                {/*</a>*/}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className={styles.loginFormButton}
                        loading={status === 'loading'}>
                    ورود
                </Button>
            </Form.Item>
        </Form>
    )
};


export default connector(LoginPage);
