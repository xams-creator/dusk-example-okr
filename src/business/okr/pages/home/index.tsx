import * as React from 'react';
import {
    CalendarOutlined,
    MenuOutlined,
    PieChartOutlined,
    StarOutlined,
    UserOutlined
} from '@ant-design/icons';

import {Button, Layout, Menu, message} from 'antd';
import {compose, connect, withRouter, Link, RouterView, bindActionCreators, withDusk, annotation} from '@xams-framework/dusk';

import DrawerForm, {actions} from '../../components/objective-editor';
import model from './index.model';
import vm from './index.view.json';

@annotation.DefineModel(model)
class OkrAppHome extends React.Component<any, any> {

    form: any;
    actions: any;
    unlisten: any;

    constructor(props: any) {
        super(props);
        this.form = React.createRef<any>();
        this.actions = props.actions || bindActionCreators(Object.assign({}, actions, props.actions), props.dispatch);
        this.state = {
            collapsed: true,
            activeKey: props.history.location.pathname
        };
        this.unlisten = props.history.listen((location) => {
            this.setState({activeKey: location.pathname});
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }


    render() {
        const {history, route, dispatch} = this.props;
        return (
            <div className={'content-pane'}>
                <Layout style={{
                    background: '#f5f6f7',
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    overflowX: 'auto',
                    overflowY: 'hidden'
                }}>
                    <Layout.Sider collapsed={this.state.collapsed} theme={'light'} width={248} style={{
                        borderRight: '1px solid #f0f0f0',
                        // padding: '16px',
                    }}>
                        <Menu selectedKeys={[this.state.activeKey]} mode="inline">
                            {/*<Menu defaultSelectedKeys={[] && [history.location.pathname + history.location.search]} mode="inline">*/}
                            <Menu.Item key="/okr/home/basic?code=xams" title="?????????????????????OKR" icon={<PieChartOutlined/>}>
                                <Link to={'/okr/home/basic?code=xams'}>??????ORK</Link>
                            </Menu.Item>
                            <Menu.Item key="/okr/home/period" title="????????????" icon={<CalendarOutlined/>}>
                                <Link to={'/okr/home/period'}>OKR????????????</Link>
                            </Menu.Item>
                            {/*<Menu.Item key="/okr/home/2" icon={<DesktopOutlined/>}>*/}
                            {/*<Link to={'/okr/home/2'}>Option 2</Link>*/}
                            {/*</Menu.Item>*/}
                            <Menu.SubMenu key="sub1" icon={<UserOutlined/>} title="??????????????????">
                                <Menu.Item key="/okr/home/basic?code=zs">
                                    <Link to={'/okr/home/basic?code=zs'}>??????</Link>
                                </Menu.Item>
                                <Menu.Item key="/okr/home/basic?code=ls">
                                    <Link to={'/okr/home/basic?code=ls'}>??????</Link>
                                </Menu.Item>
                                <Menu.Item key="/okr/home/basic?code=jkm">
                                    <Link to={'/okr/home/basic?code=jkm'}>?????????</Link>
                                </Menu.Item>
                                <Menu.Item key="/okr/home/basic?code=ww">
                                    <Link to={'/okr/home/basic?code=ww'}>??????</Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="sub2" icon={<StarOutlined/>} title="????????????">
                                <Menu.Item key="/okr/home/basic?code=test">
                                    <Link to={'/okr/home/basic?code=test'}>?????????</Link>
                                </Menu.Item>
                                <Menu.Item key="/okr/home/basic?code=ls">
                                    <Link to={'/okr/home/basic?code=ls'}>?????????</Link>
                                </Menu.Item>
                            </Menu.SubMenu>

                            {/*<Menu.Item key="9" icon={<FileOutlined/>}>*/}
                            {/*Files*/}
                            {/*</Menu.Item>*/}
                        </Menu>

                    </Layout.Sider>
                    <Layout style={{
                        background: '#f5f6f7',
                        overflowY: 'auto'
                    }}>
                        <Layout.Header>
                            <Button shape="circle" icon={<MenuOutlined style={{color: '#a6a6a6', fontSize: 14}}/>} onClick={() => {
                                this.setState({collapsed: !this.state.collapsed});
                            }}/>
                            {/*<div className={'ant-btn ant-btn-circle ant-btn-icon-only'} onClick={() => {*/}
                            {/*this.setState({collapsed: !this.state.collapsed});*/}
                            {/*}}>*/}
                            {/*<MenuOutlined style={{color: '#a6a6a6', fontSize: 14}}/>*/}
                            {/*</div>*/}
                            <Menu mode="horizontal" selectedKeys={[this.state.activeKey]}
                                  style={{borderBottom: 0, fontSize: 16, width: '100%'}}>
                                <Menu.Item key="/okr/home/basic">
                                    <Link to={'/okr/home/basic'}>OKR</Link>
                                </Menu.Item>
                                <Menu.Item key="/okr/home/tree">
                                    <Link to={'/okr/home/tree'}>
                                        ????????????
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/okr/home/dashboard">
                                    <Link to={'/okr/home/dashboard'}>
                                        ????????????
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Layout.Header>
                        <Layout.Content>
                            <div className="wso" style={{height: '100%', padding: 24, background: '#f5f6f7'}}>
                                <RouterView
                                    routes={route.routes}
                                    extraProps={{
                                        actions: this.actions,
                                        form: this.form,
                                        q: new URLSearchParams(this.props.location.search)
                                    }}
                                />
                                <DrawerForm
                                    form={this.form}
                                    templates={vm.data.templates}
                                    args={{
                                        form: {
                                            onFinish: (values) => {
                                                dispatch([
                                                    {
                                                        type: `okr/home/${values.id ? 'update' : 'create'}`,
                                                        payload: values
                                                    },
                                                    {
                                                        type: 'okr/objective/drawer/close'
                                                    }
                                                ]);
                                                this.form.current.resetFields();
                                                message.success('????????????');
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </Layout.Content>
                    </Layout>
                </Layout>
            </div>
        );
    }

}

export default compose(withRouter, connect())(OkrAppHome);



