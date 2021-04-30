import * as React from 'react';
import {
    BellOutlined,
    EllipsisOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
    LogoutOutlined,
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons';
import {Avatar, Badge, Menu, notification, Popover} from 'antd';
import {compose, withRouter} from '@xams-framework/dusk';

import './index.less';

class NavigationBar extends React.Component<any, any> {

    unlisten: any;

    constructor(props) {
        super(props);
        // const {translate} = props.$i18n;
        this.state = {
            apps: [
                {
                    name: "我的OKR",
                    style: {
                        // backgroundImage: `url(${projectImage})`,
                        backgroundImage: `url(/okr/images/navigation/my-okr.png)`
                    },
                    path: '/okr/home/basic?code=xams',
                    active: false,
                },
                {
                    name: "组织",
                    style: {
                        backgroundImage: 'url(/okr/images/navigation/organization.png)'
                    },
                    path: '/okr/todo',
                    active: false,
                },
                {
                    name: "团队OKR",
                    style: {
                        backgroundImage: 'url(/okr/images/navigation/team-okr.png)'
                    },
                    path: '/okr/app2',
                    active: false,
                },
                {
                    name: "对齐视图",
                    style: {
                        backgroundImage: 'url(/okr/images/navigation/insights.png)',
                    },
                    path: '/okr/home/tree',
                    active: false,
                },
            ]
        };

        this.notify = this.notify.bind(this);

        this.unlisten = props.history.listen((location) => {
            this.setActive(location.pathname);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    setActive(pathname) {
        this.setState((state, props) => {
            state.apps.forEach((app, index) => {
                app.active = app.path.indexOf(pathname) === 0;
            });
            return state;
        });
    }

    componentDidMount() {
        this.setActive(this.props.location.pathname);
        // topic.subscribe('xams.event.logout', () => {
        //     window.localStorage.clear();
        //     window.location.reload();
        // });
    }


    notify() {
        // const {changeLang} = this.props.$i18n;
        // changeLang('en');
        notification.info({
            message: '等待实现',
        });
    }

    onLogout() {
        localStorage.clear();
        window.location.reload();
    }


    render() {
        const {apps} = this.state;
        const {history} = this.props;

        return (
            <header className="navigation-bar">
                <section className="navigation-bar-logo">
                    <div style={{backgroundImage: `url(/okr/images/navigation/logo.png)`}}/>
                </section>
                <section className="navigation-bar-title">
                    <div>
                        <span>dusk app <strong>OKR</strong></span>
                        <div>management</div>
                    </div>
                </section>
                <section className="navigation-bar-apps">
                    <div>
                        <ul>
                            {
                                apps.map((app, index) => {
                                    return (
                                        <li key={index}
                                            className={`navigation-bar-app ${app.active && 'navigation-bar-app-active'}`}
                                            onClick={() => {
                                                apps.forEach((item) => {
                                                    item.active = item === app;
                                                });
                                                history.push(app.path);
                                                this.setState({apps});
                                            }}
                                        >
                                            <span className="navigation-bar-app-icon" style={{
                                                display: 'inline-block'
                                            }}>
                                                <span style={Object.assign({
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'inline-block',
                                                    backgroundPosition: 'center center',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '100%',
                                                    borderRadius: '4px'
                                                }, app.style)}/>
                                            </span>
                                            <span className="navigation-bar-app-text">{app.name}</span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </section>
                <section className="navigation-bar-tools">
                    <div>
                        <ul>
                            <li className="navigation-bar-tool">
                                <div className="navigation-bar-tool-create"/>
                            </li>
                            <li className="navigation-bar-tool with-background">
                                <Badge
                                    count={99}
                                    size={'small'}
                                    style={{backgroundColor: '#1b9aee'}}
                                    offset={[5, 0]}
                                >
                                    <BellOutlined style={{fontSize: '18px'}}/>
                                </Badge>
                            </li>
                            <li className="navigation-bar-tool with-background">
                                <SearchOutlined style={{fontSize: '18px'}}/>
                            </li>
                            <li className="navigation-bar-tool with-background">
                                <QuestionCircleOutlined style={{fontSize: '18px'}}/>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="navigation-bar-avatar">
                    <div>
                        <Popover overlayClassName={'navigation-bar-popover'} placement="rightBottom" content={
                            <div className="navigation-bar-popover-card">
                                <div className="navigation-bar-popover-card-body">
                                    <div className="navigation-bar-popover-card-body-column">
                                        <Menu>
                                            <Menu.Divider/>
                                            <Menu.Item icon={<UserOutlined/>} onClick={this.notify}>
                                                账号设置
                                            </Menu.Item>
                                            <Menu.Item icon={<SettingOutlined/>} onClick={this.notify}>
                                                偏好设置
                                            </Menu.Item>
                                            <Menu.Item danger icon={<LogoutOutlined/>} onClick={this.onLogout}>
                                                退出登录
                                            </Menu.Item>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        } trigger="click">
                            <Avatar
                                className={'navigation-bar-avatar-detail'}
                                // style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
                                src={
                                    <>
                                        <img
                                            src={'/okr/images/zhu.png'}
                                            alt={''}
                                        />
                                        <EllipsisOutlined className="navigation-bar-avatar-detail-icon"/>
                                    </>
                                }
                            />
                        </Popover>
                    </div>
                </section>
            </header>
        );
    }
}


export default compose(withRouter)(NavigationBar);
