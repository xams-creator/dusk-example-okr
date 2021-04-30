import * as React from 'react';
import {Avatar, Badge, Button, Card, message, Modal, Progress, Row, Col, Statistic, Collapse, Select} from 'antd';
import {compose, connect, remove, withDusk} from '@xams-framework/dusk';
import {ExclamationCircleOutlined} from '@ant-design/icons';


class OkrAppHomePeriod extends React.Component<any> {

    render() {
        return (
            <div className="okr-period">

                <ul className="project-list">
                    <li className="project-list-item">
                        <div data-dojo-attach-point="contentNode"
                             className="project-list-item-content project-list-item-shadow project-list-item-size"
                        >
                            <div data-dojo-attach-point="headerNode" className="project-list-item-content-header">
                                <div className="header-top">
                                    <span data-dojo-attach-point="titleNode" className="header-top-title" data-title="MyNote">MyNote</span>
                                    <span className="header-top-setting">
                            <a data-dojo-attach-point="openSettingNode" className="header-top-setting-handler" data-title="打开项目设置">
                                <span className="fa fa-pencil"/>
                            </a>
                            <a data-dojo-attach-point="starNode" className="header-top-setting-handler" data-title="星标">
                                <span className="fa fa-star"/>
                            </a>
                            <a data-dojo-attach-point="removeNode" className="header-top-setting-handler" data-title="删除">
                                <span className="fa fa-close"/>
                            </a>
                </span>
                                </div>
                                <div className="header-bottom">
                                    <span data-title="MyNote" data-dojo-attach-point="descNode">1111</span>
                                </div>
                            </div>
                            <div data-dojo-attach-point="footerNode" className="project-list-item-content-footer"/>
                            <div className="project-list-item-content-shadow"/>
                        </div>
                        <div className="project-list-item-mask"/>
                    </li>

                </ul>
            </div>
        );
    }

}

export default compose(withDusk, connect(
    (state: any) => {
        return {
            ...state['okr/home'],
        };
    }
))(OkrAppHomePeriod);

