import * as React from 'react';
import G6 from '@antv/g6';
import {connect} from '@xams-framework/dusk';
import {getObjetiveProgress} from '../../index.model';


const colors = {
    0: '#A7A7A7',
    1: '#1890ff',
    2: 'orange',
    3: 'red',


    B: '#5B8FF9',
    R: '#F46649',
    Y: '#EEBC20',
    G: '#52c41a',
    DI: '#A7A7A7',
};

//  组件props
const props = {
    data: {
        id: 'root',
        title: '组织某段周期的总目标',
        status: 1,
        children: [],
        collapsed: false
    },
    config: {
        padding: [20, 50],
        defaultLevel: 1,
        defaultZoom: 0.6,
        modes: {default: ['zoom-canvas', 'drag-canvas']},
    },
};


// 默认配置
const defaultConfig = {
    width: 1700,
    height: 1500,

    modes: {
        default: ['zoom-canvas', 'drag-canvas'],
    },
    fitView: true,
    animate: true,
    defaultNode: {
        type: 'flow-rect',
    },
    defaultEdge: {
        type: 'cubic-horizontal',
        style: {
            stroke: '#CED4D9',
        },
    },
    layout: {
        type: 'indented',
        direction: 'LR',
        dropCap: false,
        indent: 300,
        getHeight: () => {
            return 60;
        },
    },
};


// 自定义节点、边
const registerFn = () => {
    /**
     * 自定义节点
     */
    G6.registerNode(
        'flow-rect',
        {
            shapeType: 'flow-rect',
            draw(cfg, group) {
                const {
                    title = '',
                    collapsed,
                    status,
                    progress = 0,
                } = cfg;
                const grey = '#CED4D9';
                // 逻辑不应该在这里判断
                const rectConfig = {
                    width: 202,
                    height: 60,
                    lineWidth: 1,
                    fontSize: 12,
                    fill: '#fff',
                    radius: 4,
                    stroke: grey,
                    opacity: 1,
                };

                const nodeOrigin = {
                    x: -rectConfig.width / 2,
                    y: -rectConfig.height / 2,
                };

                const textConfig: any = {
                    textAlign: 'left',
                    textBaseline: 'bottom',
                };

                const rect = group.addShape('rect', {
                    attrs: {
                        x: nodeOrigin.x,
                        y: nodeOrigin.y,
                        ...rectConfig,
                    },
                });

                const rectBBox = rect.getBBox();

                // label title
                group.addShape('text', {

                    attrs: {
                        ...textConfig,
                        x: 12 + nodeOrigin.x,
                        y: 20 + nodeOrigin.y,
                        // @ts-ignore
                        text: title.length > 15 ? title.substr(0, 15) + '...' : title,
                        fontSize: 16,
                        opacity: 0.85,
                        fill: '#000',
                        cursor: 'pointer',
                    },
                    name: 'name-shape',
                });

                const triangle = group.addShape('marker', {
                    attrs: {
                        ...textConfig,
                        x: 12 + nodeOrigin.x + 5,
                        y: rectBBox.maxY - 12 - 8,
                        symbol: 'circle',   // 预设图形
                        r: 4,
                        // @ts-ignore
                        fill: (progress === 100 && status === 1) ? colors['G'] : colors[status],
                    },
                });

                const price = group.addShape('text', {
                    attrs: {
                        ...textConfig,
                        x: triangle.getBBox().maxX + 5,
                        y: rectBBox.maxY - 12,
                        // text: label,
                        text: status === 1 ? '正常' : status === 2 ? '有风险' : '已延期',
                        fontSize: 14,
                        fill: '#000',
                        opacity: 0.85,
                    },
                });


                // label currency
                group.addShape('text', {
                    attrs: {
                        ...textConfig,
                        x: price.getBBox().maxX + 5,
                        y: rectBBox.maxY - 12,
                        // text: currency,
                        text: '',
                        fontSize: 12,
                        fill: '#000',
                        opacity: 0.75,
                    },
                });

                // percentage
                const percentText = group.addShape('text', {
                    attrs: {
                        ...textConfig,
                        x: rectBBox.maxX - 8,
                        y: rectBBox.maxY - 12,
                        // @ts-ignore
                        // text: `${((variableValue || 0) * 100).toFixed(2)}%`,
                        text: `${progress || 100}%`,
                        fontSize: 12,
                        textAlign: 'right',
                        // @ts-ignore
                        fill: (progress === 100 && status === 1) ? colors['G'] : colors[status],
                    },
                });


                //
                // // variable name
                // group.addShape('text', {
                //     attrs: {
                //         ...textConfig,
                //         x: triangle.getBBox().minX - 4,
                //         y: rectBBox.maxY - 12,
                //         // text: variableName,
                //         text: '',
                //         fontSize: 12,
                //         textAlign: 'right',
                //         fill: '#000',
                //         opacity: 0.45,
                //     },
                // });

                // bottom line background
                const bottomBackRect = group.addShape('rect', {
                    attrs: {
                        x: nodeOrigin.x,
                        y: rectBBox.maxY - 4,
                        width: rectConfig.width,
                        height: 4,
                        radius: [0, 0, rectConfig.radius, rectConfig.radius],
                        fill: '#E0DFE3',
                    },
                });

                // bottom percent
                const bottomRect = group.addShape('rect', {
                    attrs: {
                        x: nodeOrigin.x,
                        y: rectBBox.maxY - 4,
                        // @ts-ignore
                        // width: rate * rectBBox.width,
                        // width: (!cfg.children || cfg.children.length === 0) ? rectBBox.width : progress / 100 * rectBBox.width,
                        width: progress / 100 * rectBBox.width,
                        height: 4,
                        radius: [0, 0, 0, rectConfig.radius],
                        // @ts-ignore
                        fill: (progress === 100 && status === 1) ? colors['G'] : colors[status],
                    },
                });

                // collapse rect
                // @ts-ignore
                if (cfg.children && cfg.children.length) {
                    group.addShape('rect', {
                        attrs: {
                            x: rectConfig.width / 2 - 8,
                            y: -8,
                            width: 16,
                            height: 16,
                            stroke: 'rgba(0, 0, 0, 0.25)',
                            cursor: 'pointer',
                            fill: '#fff',
                        },
                        name: 'collapse-back',
                        modelId: cfg.id,
                    });

                    // collpase text
                    group.addShape('text', {
                        attrs: {
                            x: rectConfig.width / 2,
                            y: -1,
                            textAlign: 'center',
                            textBaseline: 'middle',
                            text: collapsed ? '+' : '-',
                            fontSize: 16,
                            cursor: 'pointer',
                            fill: 'rgba(0, 0, 0, 0.25)',
                        },
                        name: 'collapse-text',
                        modelId: cfg.id,
                    });
                }

                this.drawLinkPoints(cfg, group);
                return rect;
            },
            update(cfg, item) {
                const group = item.getContainer();
                this.updateLinkPoints(cfg, group);
            },
            setState(name, value, item) {
                if (name === 'collapse') {
                    const group = item.getContainer();
                    const collapseText = group.find((e) => e.get('name') === 'collapse-text');
                    if (collapseText) {
                        if (!value) {
                            collapseText.attr({
                                text: '-',
                            });
                        } else {
                            collapseText.attr({
                                text: '+',
                            });
                        }
                    }
                }
            },
            getAnchorPoints() {
                return [
                    [0, 0.5],
                    [1, 0.5],
                ];
            },
        },
        'rect',
    );

    // G6.registerEdge(
    //     'flow-cubic',
    //     {
    //         // @ts-ignore
    //         getControlPoints(cfg) {
    //             let controlPoints = cfg.controlPoints; // 指定controlPoints
    //             // @ts-ignore
    //             if (!controlPoints || !controlPoints.length) {
    //                 const {startPoint, endPoint, sourceNode, targetNode} = cfg;
    //                 const {x: startX, y: startY, coefficientX, coefficientY} = sourceNode
    //                     // @ts-ignore
    //                     ? sourceNode.getModel()
    //                     : startPoint;
    //                 // @ts-ignore
    //                 const {x: endX, y: endY} = targetNode ? targetNode.getModel() : endPoint;
    //                 let curveStart = (endX - startX) * coefficientX;
    //                 let curveEnd = (endY - startY) * coefficientY;
    //                 curveStart = curveStart > 40 ? 40 : curveStart;
    //                 curveEnd = curveEnd < -30 ? curveEnd : -30;
    //                 controlPoints = [
    //                     {x: startPoint.x + curveStart, y: startPoint.y},
    //                     {x: endPoint.x + curveEnd, y: endPoint.y},
    //                 ];
    //             }
    //             return controlPoints;
    //         },
    //         getPath(points) {
    //             const path = [];
    //             path.push(['M', points[0].x, points[0].y]);
    //             path.push([
    //                 'C',
    //                 points[1].x,
    //                 points[1].y,
    //                 points[2].x,
    //                 points[2].y,
    //                 points[3].x,
    //                 points[3].y,
    //             ]);
    //             return path;
    //         },
    //     },
    //     'single-line',
    // );
};

class OkrAppHomeTree extends React.Component<any> {

    ref: any;
    form: any;
    graph: any = null;

    constructor(props: any) {
        super(props);
        this.ref = React.createRef<HTMLElement>();
        this.form = props.form;
        this.graph = null;
        registerFn();
    }

    getData() {
        if (this.props.objectives.length === 0) {
            return null;
        }

        const data = JSON.parse(JSON.stringify(this.props.objectives));
        return {
            id: 'root',
            title: 'Objectives',
            status: 1,
            progress: getObjetiveProgress(data),
            children: data,
            collapsed: false
        };
    }

    componentDidMount() {
        this.initGraph(this.getData());
    }

    initGraph(data) {
        if (!data) {
            return;
        }
        // @ts-ignore
        const {onInit, config} = props;
        const tooltip = new G6.Tooltip({
            // offsetX and offsetY include the padding of the parent container
            offsetX: 20,
            offsetY: 30,
            // the types of items that allow the tooltip show up
            // 允许出现 tooltip 的 item 类型
            itemTypes: ['node'],
            // custom the tooltip's content
            // 自定义 tooltip 内容
            getContent: (e) => {
                const outDiv = document.createElement('div');
                //outDiv.style.padding = '0px 0px 20px 0px';
                const model = e.item.getModel();
                const nodeName = model.name || model.title;
                let formatedNodeName = '';
                for (let i = 0; i < nodeName.length; i++) {
                    formatedNodeName = `${formatedNodeName}${nodeName[i]}`;
                    if (i !== 0 && i % 20 === 0) formatedNodeName = `${formatedNodeName}<br/>`;
                }
                outDiv.innerHTML = `${formatedNodeName}`;
                return outDiv;
            },
            shouldBegin: (e) => {
                return e.target.get('name') === 'name-shape';

            },
        });
        let graph = this.graph = new G6.TreeGraph({
            container: this.ref.current,
            ...defaultConfig,
            ...config,
            plugins: [tooltip],
        });
        if (typeof onInit === 'function') {
            onInit(graph);
        }
        graph.data(data);
        graph.render();
        graph.zoom(config.defaultZoom || 1);

        const handleCollapse = (e) => {
            const target = e.target;
            const id = target.get('modelId');
            const item = graph.findById(id);
            const nodeModel = item.getModel();
            nodeModel.collapsed = !nodeModel.collapsed;
            graph.layout();
            // @ts-ignore
            graph.setItemState(item, 'collapse', nodeModel.collapsed);
        };
        graph.on('collapse-text:click', (e) => {
            handleCollapse(e);
        });
        graph.on('collapse-back:click', (e) => {
            handleCollapse(e);
        });
        graph.on('name-shape:click', (e) => {
            const model = e.item._cfg.model;
            if (model.id !== 'root') {
                const record = this.props.objectives.find((item) => {
                    return item.id === model.objective_id || item.id === model.id;
                });
                console.log(this);
                // message.info(`打开详情---[${model.title}]`);
                this.props.form.current.resetFields();
                this.props.form.current.setFieldsValue(record);
                this.props.actions.open();

            }
        });
    }

    render() {
        const data = this.getData();
        // 0.data 存在，graph 不存在

        // 1.data 不存在 graph 不存在

        // 2.data 存在 graph 不存在

        // 3.data 存在 graph 存在

        const {graph} = this;
        if (data) {
            if (graph) {
                graph.data(data);
                graph.render();
                graph.zoom(props.config.defaultZoom || 1);
            } else {
                // this.initGraph(data);
            }
        }

        // @ts-ignore
        return (
            <>
                {/*{*/}
                {/*!data && !graph && (*/}
                {/*<EmptyObjective extra={*/}
                {/*<Button type="primary" onClick={this.props.actions.open}><FormatMessage value={'添加 Objective'}/></Button>}*/}
                {/*/>*/}
                {/*)*/}
                {/*}*/}
                <div className="okr-tree" ref={this.ref}/>
            </>

        );
    }

}

export default connect(
    (state: any) => {
        return {
            ...state['okr/home'],
        };
    }
)(OkrAppHomeTree);


//
// if (typeof window !== 'undefined')
//     window.onresize = () => {
//         if (!graph || graph.get('destroyed')) return;
//         if (!container || !container.scrollWidth || !container.scrollHeight) return;
//         graph.changeSize(container.scrollWidth, container.scrollHeight);
//     };
