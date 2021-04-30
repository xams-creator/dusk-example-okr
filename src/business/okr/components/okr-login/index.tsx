import * as React from 'react';
import {EllipsisOutlined, GithubOutlined, QqOutlined, WechatOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import {Form, Button, Input, Checkbox, Select} from 'antd';

import './index.sass';
import viewModel from './index.json';
import {useHistory} from '@xams-framework/dusk';

export const LoginForm: React.FC<{ validateLogin: Function }> = ({validateLogin}) => {

    const history = useHistory();
    const [form] = Form.useForm();
    return (
        <Form
            form={form}
            initialValues={{
                // server: 'http://localhost:11121',
                remember: true
            }}
            onFinish={(values: any) => {
                // validateLogin(values);
                localStorage.setItem('access_token', 'test');
                history.push('/okr/home/basic');
            }}
            size="large"
            className="login-form">
            {/*<Form.Item*/}
                {/*name="customer"*/}
                {/*rules={[{required: true, message: '请输入神秘代码!'}]}*/}
                {/*style={{display: 'none'}}>*/}
                {/*<Input*/}
                    {/*prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}*/}
                    {/*placeholder="神秘代码"*/}
                {/*/>*/}
            {/*</Form.Item>*/}
            <Form.Item
                name="username"
                rules={[{required: true, message: '请输入用户名!'}]}
            >
                <Input
                    prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="用户名"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: '请输入密码!'}]}
            >
                <Input
                    prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="password"
                    placeholder="密码"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="/">
                    短信验证登录
                </a>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                <div style={{
                    textAlign: 'center',
                    position: 'relative',
                    top: '1.2em'
                }}>
                    <a href="/">已有账号，忘记密码</a>
                </div>
            </Form.Item>
        </Form>
    );
};


export class LoginHeader extends React.Component {

    render(): React.ReactNode {
        return (
            <div className="header" style={{paddingTop: 28}}>
                <a href={viewModel.header.href}>
                    <img alt="logo" src={`${process.env.BASE_URL}/okr/images/logo.png`}/>
                </a>
            </div>
        );
    }

}

export class LoginFooter extends React.Component {

    render(): React.ReactNode {
        return (
            <div className="footer">
                {
                    viewModel.footer.items.map((item: any, index: number) => {
                        return (
                            <span className="footer-item" key={index}>
                                <a href={item.href}>{item.title}</a>
                            </span>
                        );
                    })
                }
            </div>
        );
    }

}


class OkrLogin extends React.Component<{
    validateLogin: Function
}> {


    protected viewModel: any;

    constructor(props) {
        super(props);
        this.viewModel = viewModel;
    }


    sideboxRender() {
        return (
            <div className="sidebox">
                <div className="sidebox-container">
                    <div className="sidebox-header">
                        <h1>{this.viewModel.sidebox.title}</h1>
                        <h2>{this.viewModel.sidebox.subtitle}</h2>
                    </div>
                    <div className="sidebox-content">
                        <div className="sidebox-content-container">
                            <div style={{opacity: 0.5}}>
                                <span>{this.viewModel.sidebox.welcome.hello}</span>
                                <span style={{marginLeft: 12}}>{this.viewModel.sidebox.welcome.text}</span>
                            </div>
                            <div style={{
                                marginTop: 16,
                                lineHeight: 1.7
                            }}>{this.viewModel.sidebox.welcome.remark}
                            </div>
                        </div>
                    </div>
                    <div className="sidebox-footer">
                        <a href="/enterprises?from=login" target="_blank">
                            <strong>{this.viewModel.sidebox.footer.title}</strong>
                            <span style={{margin: '0 7px'}}>-</span>
                            {this.viewModel.sidebox.footer.text}
                            <i className="iconfont icon-arrow-circle-right "/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    formRender() {
        return (
            <div className="form">
                <div className="form-container">
                    <div className="form-header">
                        <h2 className="form-title" style={{display: 'inline-block', fontWeight: 'bold'}}>登录</h2>
                        <span className="pull-right" style={{float: 'right'}}>
                            没有帐号？
                            <a href="/signup">点此注册</a>
                        </span>
                    </div>
                    <div className="form-content">
                        <LoginForm validateLogin={this.props.validateLogin}/>
                    </div>
                    <div className="form-oauth">
                        <div className="form-oschina" style={{textAlign: 'center'}}>
                            <a href="https://gitee.com/auth/oschina">
                                <i className="icon-logo-osc iconfont osc"/>
                                <span>使用OSChina帐号登录</span>
                            </a>
                        </div>
                        <div className="form-oauth-container" style={{marginTop: '24px'}}>
                            <div className="oauth-field">
                                <div className="ui horizontal divider session-login__oauth-title">
                                    <span className="text-muted" style={{color: '#8c92a4'}}>
                                        其他方式登录
                                    </span>
                                </div>
                            </div>
                            <div className="oauth-list">
                                {/*{*/}
                                {/*this.viewModel.form.items.map((item: any, index: number) => {*/}
                                {/*return (*/}
                                {/*<div className="item" key={index}>*/}
                                {/*<a href={item.href}>*/}
                                {/*<div className="git-other-login-icon">*/}
                                {/*/!*<Icon type={item.icon} theme="filled" style={item.style}/>*!/*/}
                                {/*</div>*/}
                                {/*</a>*/}
                                {/*</div>*/}
                                {/*);*/}
                                {/*})*/}
                                {/*}*/}
                                <div className="item">
                                    <a href="/">
                                        <div className="git-other-login-icon">
                                            <WechatOutlined style={this.viewModel.form.items[0].style}/>
                                        </div>
                                    </a>
                                </div>
                                <div className="item">
                                    <a href="/">
                                        <div className="git-other-login-icon">
                                            <QqOutlined style={this.viewModel.form.items[1].style}/>
                                        </div>
                                    </a>
                                </div>
                                <div className="item">
                                    <a href="/">
                                        <div className="git-other-login-icon">
                                            <GithubOutlined style={this.viewModel.form.items[2].style}/>
                                        </div>
                                    </a>
                                </div>
                                <div className="item">
                                    <a href="/">
                                        <div className="git-other-login-icon">
                                            <EllipsisOutlined style={this.viewModel.form.items[3].style}/>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    bodyRender() {
        return (
            <div className="container">
                <div className="body">
                    {
                        this.sideboxRender()
                    }
                    {
                        this.formRender()
                    }
                </div>
            </div>
        );
    }


    render(): React.ReactNode {
        return (
            <div className="wso router-login">
                <LoginHeader/>
                {
                    this.bodyRender()
                }
                <LoginFooter/>
            </div>
        );
    }

}

export default OkrLogin;
