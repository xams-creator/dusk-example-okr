import * as React from 'react';

import {PlusCircleFilled, PlusOutlined} from '@ant-design/icons';
import {
    Drawer,
    Form,
    Button,
    Col,
    Row,
    Input,
    Space,
    Progress,
    Radio,
    InputNumber,
    Divider,
    Tooltip,
    message,
    DatePicker, Mentions, Modal, Tabs, Card, Select, Avatar
} from 'antd';
import {InfoCircleOutlined, MinusCircleOutlined} from '@ant-design/icons/lib';
import {connect, compose, withDusk, hitchActions, bindActionCreators, annotation} from '@xams-framework/dusk';
import model from './index.model';

export const actions = {
    open() {
        return (dispatch) => {
            dispatch({
                type: 'okr/objective/drawer/open'
            });
        };
    },
    close() {
        return (dispatch) => {
            dispatch({
                type: 'okr/objective/drawer/close'
            });
        };
    },
    edit(data) {
        return (dispatch) => {
            dispatch({
                type: 'okr/objective/drawer/edit',
                payload: data,
            });
        };
    }
};


class LocalizedModal extends React.Component<{ onHide?: Function, showAction: boolean, templates: any }> {
    state = {visible: false};

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <>
                {this.props.showAction && <a onClick={this.showModal}>See Sample OKRs</a>}
                <Modal
                    bodyStyle={{
                        padding: '24px 60px'
                    }}
                    title={<div style={{textAlign:'center'}}><strong>Sample OKRs</strong></div>}
                    zIndex={1440}
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText={'确认'}
                    width={1440}
                    cancelText={'取消'}
                    footer={null}
                >
                    <div style={{fontSize: 14, marginBottom: 14}}>These can be edited after adding them..</div>
                    <Tabs
                        // tabBarExtraContent={<Button>Extra Action</Button>}
                    >
                        {
                            this.props.templates.map((item, index) => {
                                return (
                                    <Tabs.TabPane tab={item.title} key={index} style={{padding: 12}}>
                                        <Row gutter={[40, 28]}>
                                            {
                                                item.cards.map((card, index) => {
                                                    return (
                                                        <Col span={12} key={index}>
                                                            <Card
                                                                title={card.title}
                                                                bodyStyle={{height: 172}}
                                                                hoverable
                                                                extra={
                                                                    <Button
                                                                        danger
                                                                        type="primary"
                                                                        onClick={() => {
                                                                            console.log(card);
                                                                            this.props.onHide(card);
                                                                            this.hideModal();
                                                                        }}
                                                                    >
                                                                        Add
                                                                    </Button>}
                                                            >
                                                                <ul style={{padding: '0 12px'}}>
                                                                    {
                                                                        (card.children || []).map((child, index) => {
                                                                            return (
                                                                                <li key={index}>{child.title}</li>
                                                                            );
                                                                        })
                                                                    }
                                                                </ul>
                                                            </Card>
                                                        </Col>
                                                    );
                                                })
                                            }
                                        </Row>
                                    </Tabs.TabPane>
                                );
                            })
                        }
                    </Tabs>
                </Modal>
            </>
        );
    }
}

@annotation.DefineModel(model)
class DrawerForm extends React.Component<any> {

    form: any;
    actions: any;
    actions1: any;

    constructor(props: any) {
        super(props);
        this.form = props.form || React.createRef<any>();
        this.actions = hitchActions(bindActionCreators(Object.assign({}, actions, props.actions), props.dispatch), this);
    }

    render() {
        const {drawer, form} = this.props.args || {};
        let record: any = {};
        if (this.form && this.form.current) {
            record = this.form.current.getFieldValue();
        }
        const {status, progress} = record;
        return (
            <Drawer
                width={940}
                title={<div><strong>{!record.id ? 'New Objective' : 'Edit Objective'}</strong></div>}
                onClose={this.actions.close}
                visible={this.props.visible}
                bodyStyle={{paddingBottom: 80}}
                forceRender
                footer={
                    <div style={{textAlign: 'right'}}>
                        <Button onClick={this.actions.close} style={{marginRight: 8}}>取消</Button>
                        <Button onClick={() => {
                            this.form.current.submit();
                        }} type="primary">确认</Button>
                    </div>
                }
                {...drawer}
            >
                {/*<Divider orientation="left"><FormatMessage value={'目标'}/></Divider>*/}
                <Form
                    ref={this.form}
                    layout="vertical"
                    initialValues={{
                        id: null,
                        index: 0,
                        title: null,
                        // expected_time: null,
                        status: 1,
                        progress: 0,
                        owner: 'zhu',
                        children: [
                            {
                                id: null,
                                objective_id: null,
                                // expected_time: null,
                                owner: 'zhu',
                                title: null,
                                status: 1,
                                progress: 0,
                                index: 0,
                            }
                        ]
                    }}
                    onFinishFailed={() => {
                        return message.error('请检查数据');
                    }}
                    {...form}
                >
                    <Form.Item name="id" label="id" hidden>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="index" label="index" hidden>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="created_time" label="index" hidden>
                        <Input/>
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={24}>
                            <div style={{
                                position: 'absolute',
                                top: 0, //-32,
                                zIndex: 999,
                                right: 0
                            }}>
                                <LocalizedModal templates={this.props.templates} showAction={!record.id} onHide={(card) => {
                                    // const record = this.form.current.getFieldsValue();
                                    // record.title = card.title;
                                    this.form.current.setFieldsValue(card);
                                    // this.form.current.setFieldVal
                                }}/>
                            </div>
                            <Form.Item
                                name="title"
                                label={'目标'}
                                rules={[{required: true, message: '请输入内容'}]}
                            >
                                <Input size={'large'}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        {/*<Col span={8}>*/}
                        {/*<Form.Item*/}
                        {/*name="expected_time"*/}
                        {/*label="期望完成时间"*/}
                        {/*rules={[{required: false, message: '请输入内容'}]}*/}
                        {/*>*/}
                        {/*<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>*/}
                        {/*</Form.Item>*/}
                        {/*</Col>*/}
                        <Col span={8}>
                            <Form.Item
                                name="status"
                                label={'状态'}
                                rules={[{required: true, message: 'Please choose the type'}]}
                            >
                                <Radio.Group value={1}>
                                    <Radio value={1}>正常</Radio>
                                    <Radio value={2} className={'warning'} style={{borderColor: '#f58d2c'}}>有风险</Radio>
                                    <Radio value={3} className={'danger'} style={{borderColor: 'red'}}>已延期</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="progress"
                                label={'进度'}
                                valuePropName={'percent'}
                            >
                                <Progress
                                    strokeColor={status === 2 ? 'orange' : status === 3 ? 'red' : null}
                                    status={progress === 100 ? 'success' : 'active'}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="owner"
                                label={'处理人'}
                            >
                                <Select bordered={false} style={{width: 150}}>
                                    <Select.Option value="zhu">
                                        <Avatar
                                            src={'/okr/images/zhu.png'}
                                            size={'small'}
                                        />
                                        <span style={{paddingLeft: 10}}>David Zhu</span>
                                    </Select.Option>
                                    <Select.Option value="yuchen">
                                        <Avatar
                                            src={'/okr/images/yuchen.png'}
                                            size={'small'}
                                        />
                                        <span style={{paddingLeft: 10}}>yu chen</span>
                                    </Select.Option>
                                    <Select.Option value="kobe">
                                        <Avatar
                                            src={'/okr/images/kobe.png'}
                                            size={'small'}
                                        />
                                        <span style={{paddingLeft: 10}}>Kobe Yang</span>
                                    </Select.Option>
                                    <Select.Option value="creator">
                                        <Avatar
                                            src={'/okr/images/creator.png'}
                                            size={'small'}
                                        />
                                        <span style={{paddingLeft: 10}}>The Guy</span>
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider orientation="left">Key Results</Divider>
                    <Form.List name="children">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, fieldKey, ...restField}, index) => (
                                    <Row gutter={16} key={key}>
                                        <Col span={9}>
                                            <Form.Item
                                                label={index === 0 ? '关键结果' : null}
                                                {...restField}
                                                name={[name, 'title']}
                                                fieldKey={[fieldKey, 'title']}
                                                rules={[{required: true, message: '请输入内容'}]}
                                            >
                                                {/*<Tooltip*/}
                                                {/*trigger={['focus']}*/}
                                                {/*title={'123123123123123123'}*/}
                                                {/*placement="topLeft"*/}
                                                {/*>*/}
                                                {/*<Input placeholder="" suffix={*/}
                                                {/*<Tooltip title="尽量要短">*/}
                                                {/*<InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>*/}
                                                {/*</Tooltip>*/}
                                                {/*}/>*/}
                                                <Input placeholder=""/>
                                                {/*</Tooltip>*/}
                                                {/*<Mentions rows={1}>*/}
                                                {/*<Mentions.Option value="张三">张三</Mentions.Option>*/}
                                                {/*<Mentions.Option value="李四">李四</Mentions.Option>*/}
                                                {/*<Mentions.Option value="王五">王五</Mentions.Option>*/}
                                                {/*</Mentions>*/}
                                            </Form.Item>
                                        </Col>
                                        <Space style={{display: 'flex', marginBottom: 8}} align="baseline">

                                            {/*<Form.Item*/}
                                            {/*label={index === 0 ? '期望完成时间' : null}*/}
                                            {/*// label="Status"*/}
                                            {/*{...restField}*/}
                                            {/*name={[name, 'expected_time']}*/}
                                            {/*fieldKey={[fieldKey, 'expected_time']}*/}
                                            {/*rules={[{required: false, message: '请输入内容'}]}*/}
                                            {/*>*/}
                                            {/*<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>*/}
                                            {/*</Form.Item>*/}
                                            <Form.Item
                                                label={index === 0 ? '状态' : null}
                                                // label="Status"
                                                {...restField}
                                                name={[name, 'status']}
                                                fieldKey={[fieldKey, 'status']}
                                                rules={[{required: true, message: '请输入内容'}]}
                                            >
                                                <Radio.Group value={1}>
                                                    <Radio value={1}>正常</Radio>
                                                    <Radio value={2} className={'warning'} style={{borderColor: '#f58d2c'}}>有风险</Radio>
                                                    <Radio value={3} className={'danger'} style={{borderColor: 'red'}}>已延期</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                label={index === 0 ? '进度' : null}
                                                name={[name, 'progress']}
                                                fieldKey={[fieldKey, 'progress']}
                                                rules={[{required: true, message: '请输入内容'}]}
                                            >
                                                <InputNumber precision={0} width={150} placeholder="" step={10} min={0} max={100}/>
                                            </Form.Item>

                                            <Form.Item
                                                label={index === 0 ? '处理人' : null}
                                                {...restField}
                                                name={[name, 'owner']}
                                                fieldKey={[fieldKey, 'owner']}
                                                rules={[{required: false, message: '请输入内容'}]}
                                            >
                                                <Select bordered={false} style={{width: 150}}>
                                                    <Select.Option value="zhu">
                                                        <Avatar
                                                            // style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
                                                            src={'/okr/images/zhu.png'}
                                                            size={'small'}
                                                        />
                                                        <span style={{paddingLeft: 10}}>David Zhu</span>
                                                    </Select.Option>
                                                    <Select.Option value="yuchen">
                                                        <Avatar
                                                            // style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
                                                            src={'/okr/images/yuchen.png'}
                                                            size={'small'}
                                                        />
                                                        <span style={{paddingLeft: 10}}>yu chen</span>
                                                    </Select.Option>
                                                    <Select.Option value="kobe">
                                                        <Avatar
                                                            // style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
                                                            src={'/okr/images/kobe.png'}
                                                            size={'small'}
                                                        />
                                                        <span style={{paddingLeft: 10}}>Kobe Yang</span>
                                                    </Select.Option>
                                                    <Select.Option value="creator">
                                                        <Avatar
                                                            // style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
                                                            src={'/okr/images/creator.png'}
                                                            size={'small'}
                                                        />
                                                        <span style={{paddingLeft: 10}}>The Guy</span>
                                                    </Select.Option>
                                                </Select>
                                            </Form.Item>

                                            {/*<Form.Item*/}
                                            {/*{...restField}*/}
                                            {/*name={[name, 'score']}*/}
                                            {/*fieldKey={[fieldKey, 'score']}*/}
                                            {/*rules={[{required: true, message: 'score'}]}*/}
                                            {/*>*/}
                                            {/*<Input placeholder="score"/>*/}
                                            {/*</Form.Item>*/}
                                            {
                                                <MinusCircleOutlined style={{
                                                    position: 'relative',
                                                    top: index === 0 ? 36 : 0
                                                }} onClick={() => remove(name)}/>
                                            }
                                            <Form.Item
                                                {...restField}
                                                label={index === 0 ? 'id' : null}
                                                name={[name, 'id']}
                                                fieldKey={[fieldKey, 'id']}
                                                hidden
                                                rules={[{required: false, message: '请输入内容'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                label={index === 0 ? 'objective_id' : null}
                                                name={[name, 'objective_id']}
                                                fieldKey={[fieldKey, 'objective_id']}
                                                hidden
                                                rules={[{required: false, message: '请输入内容'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                label={index === 0 ? 'index' : null}
                                                name={[name, 'index']}
                                                fieldKey={[fieldKey, 'index']}
                                                hidden
                                                rules={[{required: false, message: '请输入内容'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                label={index === 0 ? 'index' : null}
                                                name={[name, 'created_time']}
                                                fieldKey={[fieldKey, 'created_time']}
                                                hidden
                                                rules={[{required: false, message: '请输入内容'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Space>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add({
                                        id: null,
                                        objective_id: null,
                                        title: null,
                                        status: 1,
                                        owner: 'zhu',
                                        progress: 0,
                                        index: 0,
                                    })} block icon={<PlusOutlined/>}>
                                        添加 Key Result
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Drawer>
        );
    }
}

export default compose(withDusk, connect(
    (state: any) => {
        return {
            ...state['okr/objective/drawer'],
        };
    }
))(DrawerForm);
