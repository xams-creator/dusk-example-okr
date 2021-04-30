import * as React from 'react';

import {PlusOutlined} from '@ant-design/icons';
import './index.less';

class ObjectiveCreator extends React.Component<any> {

    render() {
        return (
            <div className="objective-creator">
                <span className="objective-creator-body" onClick={this.props.onClick}>
                    <PlusOutlined className="objective-creator-icon"/>
                    <span>添加 Objective</span>
                </span>
            </div>
        );
    }

}

export default ObjectiveCreator;


