import * as React from 'react';
import {Button, List, Result, Comment, Form, Input, Avatar, Mentions, Select} from 'antd';
import moment from 'moment';
import './index.less';
import {genCreatedTime} from '../../pages/home/index.model';
import {annotation, compose, connect} from '@xams-framework/dusk';
import model from './index.model';


const CommentList = ({comments}) => (
    <List
        size={'large'}
        dataSource={comments}
        children={<span/>}
        header={<span style={{fontSize: 20}}>评论</span>}
        itemLayout="horizontal"
        renderItem={(props: any) => <Comment {...props} />}
    />
);

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <React.Fragment>
        <Form.Item>
            <Mentions
                placeholder={'输入评论（Enter 换行，Ctrl + Enter 发送）'}
                rows={4}
                onChange={onChange}
                value={value}
                onPressEnter={(e) => {
                    if (e.ctrlKey) {
                        return onSubmit();
                    }
                }}
            >
                <Mentions.Option value="David Zhu">
                    <Avatar
                        src={'/okr/images/zhu.png'}
                        size={'small'}
                    />
                    <span style={{paddingLeft: 10}}>David Zhu</span>
                </Mentions.Option>
                <Mentions.Option value="yuchen">
                    <Avatar
                        src={'/okr/images/yuchen.png'}
                        size={'small'}
                    />
                    <span style={{paddingLeft: 10}}>yu chen</span>
                </Mentions.Option>
                <Mentions.Option value="Kobe Yang">
                    <Avatar
                        src={'/okr/images/kobe.png'}
                        size={'small'}
                    />
                    <span style={{paddingLeft: 10}}>Kobe Yang</span>
                </Mentions.Option>
                <Mentions.Option value="The Guy">
                    <Avatar
                        src={'/okr/images/creator.png'}
                        size={'small'}
                    />
                    <span style={{paddingLeft: 10}}>The Guy</span>
                </Mentions.Option>
            </Mentions>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                添加评论
            </Button>
        </Form.Item>
    </React.Fragment>
);


@annotation.DefineModel(model)
class CommentView extends React.Component<any> {
    state = {
        comments: [],
        submitting: false,
        value: '',
    };

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        const value = this.state.value;
        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
            });
            this.props.dispatch({
                type: 'okr/home/comment/create',
                payload: {
                    author: 'David Zhu',
                    avatar: '/okr/images/zhu.png',
                    content: <p>{value}</p>,
                    datetime: genCreatedTime(),
                }
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e,
        });
    };

    render() {
        const {submitting, value} = this.state;
        const {comments} = this.props;
        return (
            <div className={'comment-view'} style={{padding: 12}}>
                {comments && comments.length > 0 && <CommentList comments={comments}/>}
                <Comment
                    avatar={
                        <Avatar
                            src="/okr/images/zhu.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </div>
        );
    }
}

export default compose(connect(
    (state: any) => {
        return {
            ...state['okr/home/comment'],
        };
    }
))(CommentView);
