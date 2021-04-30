import * as React from 'react';
import {Avatar, Badge, Button, Card, message, Modal, Progress, Row, Col, Statistic, Collapse, Select} from 'antd';
import {compose, connect, remove, withDusk} from '@xams-framework/dusk';
import {ExclamationCircleOutlined} from '@ant-design/icons';

import ObjectiveCreator from '../../../../components/objective-creator';
import EmptyObjective from '../../../../components/empty-objective';
import CommentView from '../../../../components/comment-view';
import SortableTable from '../../../../components/sortable-table';

import {DemoPie} from '../../../../components/dashboard';
import moment from 'moment';
import {getObjetiveProgress} from '../../index.model';

class OkrAppHomeBasic extends React.Component<any> {
    actions: any;
    form: any;

    constructor(props: any) {
        super(props);
        this.form = props.form || React.createRef<any>();
        this.actions = props.actions;
        this.open = this.open.bind(this);
    }

    open(record) {
        this.form.current.resetFields();
        record && this.form.current.setFieldsValue(record);
        this.actions.open();
    }

    getSortTableColumns() {
        return [
            {
                title: '目标',
                dataIndex: 'title',
                // render: (value, record, index) => {
                //     return (
                //         <Input onChange={()=>{
                //             console.log(this);
                //         }} placeholder="" bordered={false} defaultValue={value} suffix={
                //             <Tooltip title="尽量要短">
                //                 <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                //             </Tooltip>
                //         }/>
                //     )
                // }
            },
            {
                title: '处理人',
                dataIndex: 'owner',
                width: 100,
                render: (value, record, index) => (
                    <>
                        <Avatar
                            // style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
                            src={`${process.env.BASE_URL}/okr/images/${value}.png`}
                        />
                    </>
                )
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 100,
                render: (value, record, index) => {
                    let status = null;
                    let text: any = '';
                    switch (value) {
                        case 1:
                            status = 'success';
                            text = '正常';
                            break;
                        case 2:
                            status = 'warning';
                            text = '有风险';
                            break;
                        case 3:
                            status = 'error';
                            text = '已延期';
                            break;
                        default:
                            break;
                    }
                    return (
                        <span><Badge status={status}/>{text}</span>
                    );
                }
            },
            {
                title: '进度',
                dataIndex: 'progress',
                width: 270,
                render: (progress, record, index) => {
                    let color = null;
                    switch (record.status) {
                        case 1:
                            break;
                        case 2:
                            color = 'orange';
                            break;
                        case 3:
                            color = 'red';
                            break;
                        default:
                            break;
                    }
                    return (
                        <Progress strokeColor={color} status={progress === 100 ? 'success' : 'active'} percent={progress}/>
                    );
                }
            },
            {
                title: '创建时间',
                dataIndex: 'created_time',
                width: 170,
            },
            // {
            //     title: 'Expected_time',
            //     dataIndex: 'expected_time',
            //     width: 170,
            //     render: (value) => {
            //         return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : null;
            //     }
            // },
            {
                title: '操作',
                key: 'operation',
                width: 270,
                render: (value, model, index) => {
                    const record = this.props.objectives.find((item) => {
                        return item.id === model.objective_id || item.id === model.id;
                    });
                    // style={{visibility: !model.objective_id ? 'visible' : 'hidden'}}
                    return (
                        <>
                            <Button type={'link'} onClick={() => {
                                this.form.current.resetFields();
                                this.form.current.setFieldsValue(record);
                                this.actions.open();
                            }}>编辑</Button>
                            <Button type={'link'} danger onClick={() => {
                                const {dispatch} = this.props;

                                Modal.confirm({
                                    title: '确认删除此条数据吗?',
                                    icon: <ExclamationCircleOutlined/>,
                                    // content: 'Bla bla ...',
                                    okButtonProps: {
                                        danger: true,
                                    },
                                    onOk() {
                                        if (model === record) {
                                            dispatch({
                                                type: 'okr/home/delete',
                                                payload: model
                                            });
                                        } else {
                                            remove(record.children, model);
                                            dispatch({
                                                type: 'okr/home/update',
                                                payload: record
                                            });
                                        }
                                        message.success('删除成功');
                                    },
                                    okText: '确认',
                                    cancelText: '取消',
                                });
                            }}>删除</Button>
                        </>
                    );
                }
            },
        ];
    }

    render() {
        // const q = new URLSearchParams(this.props.location.search);
        // console.log(this.props.q.get('code'));
        const columns = this.getSortTableColumns();
        const data = this.props.objectives;
        const progress = getObjetiveProgress(data);
        const {dispatch} = this.props;
        const {close} = this.actions;
        const showObjectiveCreator = data.length === 0;
        return (
            <div className="okr-basic">
                {
                    showObjectiveCreator && (
                        <EmptyObjective extra={
                            <Button type="primary" onClick={this.open}>添加 Objective</Button>}
                        />
                    )
                }

                {
                    !showObjectiveCreator && (
                        <div className="okr-sorted-list">
                            <Collapse style={{marginBottom: 20}} bordered={false} defaultActiveKey={['1']}>
                                <Collapse.Panel style={{border: 0, background: '#fff'}} header={'总结'} key="1"
                                                showArrow={false}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={6}>
                                            <Card
                                                headStyle={{border: 0, background: '#fff'}}
                                                bordered={false} style={{height: 190}}
                                                type="inner"
                                                title={<strong>平均进度</strong>}>
                                                <div style={{height: 130}}>
                                                    {/*<DemoLine/>*/}
                                                    <Row style={{marginBottom: 16}}>
                                                        <Progress
                                                            showInfo={progress === 1000}
                                                            success={{percent: progress}}
                                                            percent={100}
                                                            // strokeColor={'red'}
                                                            strokeWidth={20}
                                                        />
                                                    </Row>
                                                    <Row style={{marginBottom: 16}}>
                                                        <Badge status="processing"/>期望进度: <span>100%</span>
                                                    </Row>
                                                    <Row style={{marginBottom: 16}}>
                                                        <Badge status="success"/> 实际进度: <strong>{progress}%</strong>
                                                    </Row>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col span={6}>
                                            <Card
                                                headStyle={{border: 0, background: '#fff'}}
                                                bordered={false} style={{height: 190}}
                                                type="inner"
                                                title={<strong>状态看板</strong>}
                                            >
                                                <div style={{height: 130}}>
                                                    <DemoPie objectives={data}/>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Collapse.Panel>
                            </Collapse>

                            <SortableTable
                                dataSource={data}
                                columns={columns}
                                expandedColumns={columns}
                                onSortEnd={(data) => {
                                    dispatch({
                                        type: `okr/home/sort`,
                                        payload: data
                                    });
                                }}
                            />
                            <ObjectiveCreator onClick={this.open}/>
                        </div>
                    )
                }
                <CommentView/>
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
))(OkrAppHomeBasic);

