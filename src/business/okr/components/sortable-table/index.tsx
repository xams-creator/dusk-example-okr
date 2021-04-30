import * as React from 'react';
import {Table} from 'antd';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import {MenuOutlined} from '@ant-design/icons/lib';
import {arrayMove} from '@xams-framework/dusk';
import CommentView from '../comment-view';

const DragHandle = SortableHandle(() => <MenuOutlined style={{cursor: 'grab', color: '#999'}}/>);
const SortableItem = SortableElement(props => <tr {...props} />);
const SortableContainerTBody = SortableContainer(props => <tbody {...props} />);

class SortableTable extends React.Component<any, any> {

    node: any;

    constructor(props) {
        super(props);
        this.state = {
            columns: [].concat([
                {
                    title: '',
                    key: 'sort',
                    width: 30,
                    className: 'drag-visible',
                    render: () => <DragHandle/>,
                }
            ], props.columns || []),
            expandedColumns: [].concat([
                {
                    title: '',
                    key: '',
                    width: 60,
                },
                {
                    title: '',
                    key: 'sort',
                    width: 30,
                    className: 'drag-visible',
                    render: () => <DragHandle/>,
                },
            ], props.expandedColumns || []),
        };
        this.node = null;
    }

    onSortStart = ({node, index, collection, isKeySorting}) => {
        this.node = node.parentNode;
        this.node.classList.toggle('dragged-table');
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        const {dataSource} = this.props;
        if (this.node) {
            this.node.classList.toggle('dragged-table');
            this.node = null;
        }

        if (oldIndex !== newIndex) {
            const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
            this.props.onSortEnd && this.props.onSortEnd(newData);
            // this.setState({dataSource: newData});
        }
    };

    DraggableContainer = props => (
        <SortableContainerTBody
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortStart={this.onSortStart}
            onSortEnd={this.onSortEnd}
            {...props}
        />
    );

    DraggableBodyRow = ({...restProps}) => {
        const {dataSource} = this.props;
        const index = dataSource.findIndex(x => x.id === restProps['data-row-key']);
        return (
            <SortableItem index={index} {...restProps} />
        );
    };


    expandedRowRender = (args: any) => (record, index, indent, expanded) => {
        return (
            <div key={index} style={{margin: '12px 0px'}}>
                <SortableTable
                    style={{background: '#eee'}}
                    dataSource={record.children}
                    onSortEnd={this.props.onSortEnd}
                    args={[Object.assign({}, {
                        columns: this.state.expandedColumns,
                        showHeader: false,
                        pagination: false,
                        expandable: {},
                    }, args)]}
                />
                {/*<CommentView/>*/}
            </div>
        );
    };

    render() {
        const {dataSource} = this.props;
        const {columns} = this.state;
        const [args1, args2] = this.props.args || [{}, {}];
        return (
            <Table
                size={'large'}
                pagination={false}
                dataSource={dataSource}
                childrenColumnName={'details'}
                expandable={{
                    // expandedRowKeys: expandedRowKeys,
                    expandedRowRender: this.expandedRowRender(args2),
                    // defaultExpandAllRows: true,
                    // onExpand: (expanded, record) => {
                    //     this.setState((state: any) => {
                    //         expanded ? state.expandedRowKeys.push(record.id) : remove(state.expandedRowKeys, record.id);
                    //         return state;
                    //     });
                    // }
                }}
                columns={columns}
                rowKey="id"
                components={{
                    body: {
                        wrapper: this.DraggableContainer,
                        row: this.DraggableBodyRow,
                    },
                }}
                {...args1}
            />
        );
    }
}


export default SortableTable;
