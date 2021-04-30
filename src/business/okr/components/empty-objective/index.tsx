import * as React from 'react';
import {Button, List, Result, Comment, Form, Input, Avatar} from 'antd';
import empty from './images/empty.png';

import './index.less';

export function EmptyResult() {
    return (
        <Result
            status="404"
            title={'等待实现'}
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
        />
    );
}


function EmptyObjective(props?) {

    return (
        <Result
            icon={<img src={empty} alt="" style={{width: 250, height: 150}}/>}
            subTitle={<span style={{fontSize: 16}}>暂无数据</span>}
            extra={props.extra || <Button type="primary">添加 Objective</Button>}
        />
    );
}

export default EmptyObjective;

