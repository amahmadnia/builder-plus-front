import React from "react";
import {Form, Row, Col, Collapse, Button, Input, Radio, Checkbox, Space} from 'antd';
import {FeatureType, UserTypeType} from "src/types";
import {featuresToGroups} from "src/lib";


type PropsType = {
    features: FeatureType[];
    user_type: UserTypeType;
    onfinish: (values: any) => void;
    loading: boolean;
}

let categories: { [key: string]: FeatureType[] } | undefined = undefined;
let default_form_data = {};
let user__type: UserTypeType | undefined;
export const UserTypeSection: React.FC<PropsType> = ({features, user_type, onfinish, loading}) => {
    const [form] = Form.useForm();
    const [state, setState] = React.useState<any>({});

    console.log(state);
    if (!categories) {
        [categories, default_form_data] = featuresToGroups(features)
    }
    const form_data: any = {
        title: user_type.title,
        ...default_form_data
    }
    React.useEffect(() => {
        if (user__type !== user_type) {
            console.log(user_type)
            const s: any = {};
            user_type.type_actions.forEach(action => {
                form_data[action.feature + '_' + action.type] = action.permission;
                s[action.feature] = s[action.feature] ? s[action.feature] + 1 : 1;
            });
            console.log(s)
            for (const key in s) {
                if (s[key] === 5)
                    s[key] = true
                else
                    s[key] = false;
            }
            setState(s);
            form.setFieldsValue(form_data);
            user__type = user_type;
        }
    });

    const select_feature = (selected_feature: any) => {
        const {checked, name} = selected_feature.target;
        const select = name.split('_')[0]
        let value: 'self' | 'none';
        value = checked ? 'self' : 'none'
        const selected = {
            [select + '_view']: value,
            [select + '_new']: value,
            [select + '_edit']: value,
            [select + '_delete']: value,
            [select + '_share']: value,
        };
        form.setFieldsValue(selected);
        setState((state: any) => ({...state, [select]: checked}))
    };
    const select_category = (selected_category: any) => {
        const {checked, name}: { name: string, checked: boolean } = selected_category.target;
        const user_types = categories![name];
        user_types.forEach(user_type => {
            select_feature({target: {checked, name: user_type.id + '_'}})
        });
    };

    const change_feature = (changed_feature: any, feature: FeatureType) => {
        const condition = changed_feature.target.value === 'none';
        if (!condition) {
            const names = [`${feature.id}_view`, `${feature.id}_new`, `${feature.id}_edit`, `${feature.id}_delete`, `${feature.id}_share`]
            const fields = form.getFieldsValue();
            for (let i = 0; i < 5; i++)
                if (fields[names[i]] === 'none')
                    return;
            setState({...state, [feature.id]: true});
        } else
            setState({...state, [feature.id]: false});
    };

    const category_is_active = (category: string) => {
        const uT = categories![category];
        for (let i = 0; i < uT.length; i++) {
            if (!state[uT[i].id])
                return false
        }
        return true;

    };


    return (
        <Form
            hideRequiredMark
            initialValues={form_data}
            form={form}
            onFinish={onfinish}
        >
            <Row gutter={16}>

                <Col span={18}>
                    <Form.Item
                        name="title"
                        label="عنوان"
                        rules={[{
                            required: true,
                            message: 'عنوان را وارد کنید',
                        }]}
                    >
                        <Input placeholder={'عنوان'} className={'persian'}/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Button
                        loading={loading}
                        onClick={() => {
                            form.submit()
                        }}> ثبت تغییرات</Button>
                </Col>
                <Col span={24}>
                    <Collapse>

                        {
                            Object.entries(categories).map(category => (

                                    <React.Fragment key={category[0]}>
                                        <div
                                            key={category[0]}
                                            children={
                                                <Space>
                                                    <b>{category[0]}</b>
                                                    <Checkbox
                                                        name={category[0]}
                                                        onChange={select_category}
                                                        checked={category_is_active(category[0])}
                                                    />
                                                </Space>}
                                            className='user-type-collapse-group'
                                        />
                                        {
                                            category[1].map(feature => (

                                                    <Collapse.Panel
                                                        forceRender={true}
                                                        key={feature.id + '_feature'}
                                                        header={
                                                            <Space>
                                                                <div>{feature.title}</div>
                                                                <Checkbox
                                                                    className="user-type--collapse-panel"
                                                                    name={`${feature.id}_feature`}
                                                                    onChange={select_feature}
                                                                    checked={state[`${feature.id}`]}
                                                                />
                                                            </Space>
                                                        }>
                                                        <Form.Item
                                                            label={'نمایش'}
                                                            name={feature.id + "_view"}
                                                            labelCol={{span: 4}}
                                                        >
                                                            <Radio.Group className="user-type-section__radio-group"
                                                                         onChange={(event) => change_feature(event, feature)}
                                                            >
                                                                <Radio value="none">هیچ کدام</Radio>
                                                                <Radio value="self">خودکاربر</Radio>
                                                                <Radio value="all_users">همه کاربران</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>

                                                        <Form.Item label={'افزودن'}
                                                                   name={feature.id + "_new"}
                                                                   labelCol={{span: 4}}
                                                        >
                                                            <Radio.Group className="user-type-section__radio-group"
                                                                         onChange={(event) => change_feature(event, feature)}
                                                            >
                                                                <Radio value="none">هیچ کدام</Radio>
                                                                <Radio value="self">خودکاربر</Radio>
                                                                <Radio value="all_users">همه کاربران</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                        <Form.Item
                                                            label={'ویرایش'}
                                                            name={feature.id + "_edit"}
                                                            labelCol={{span: 4}}
                                                        >
                                                            <Radio.Group className="user-type-section__radio-group"
                                                                         onChange={(event) => change_feature(event, feature)}
                                                            >
                                                                <Radio value="none">هیچ کدام</Radio>
                                                                <Radio value="self">خودکاربر</Radio>
                                                                <Radio value="all_users">همه کاربران</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                        <Form.Item
                                                            label={'حذف'}
                                                            name={feature.id + "_delete"}
                                                            labelCol={{span: 4}}
                                                        >
                                                            <Radio.Group className="user-type-section__radio-group"
                                                                         onChange={(event) => change_feature(event, feature)}
                                                            >
                                                                <Radio value="none">هیچ کدام</Radio>
                                                                <Radio value="self">خودکاربر</Radio>
                                                                <Radio value="all_users">همه کاربران</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>

                                                        <Form.Item
                                                            label={'اشتراک گذاری'}
                                                            name={feature.id + "_share"}
                                                            labelCol={{span: 4}}
                                                        >
                                                            <Radio.Group className="user-type-section__radio-group"
                                                                         onChange={(event) => change_feature(event, feature)}
                                                            >
                                                                <Radio value="none">هیچ کدام</Radio>
                                                                <Radio value="self">کاربران اصلی</Radio>
                                                                <Radio value="all_users">همه کاربران</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </Collapse.Panel>
                                                )
                                            )
                                        }
                                    </React.Fragment>
                                )
                            )
                        }
                    </Collapse>
                </Col>
            </Row>
        </Form>
    )
}