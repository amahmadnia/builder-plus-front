import React from 'react';
import {Layout} from 'antd';

type PropsType = { children: React.ReactElement | React.ReactElement[] };

export function WithoutAuthLayout(props: PropsType) {

    return (
        <Layout.Content>
            {
                props.children
            }
        </Layout.Content>
    )
}