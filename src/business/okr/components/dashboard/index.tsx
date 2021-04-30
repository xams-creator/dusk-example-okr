import * as React from 'react';

import {Line, Pie} from '@ant-design/charts';

export const DemoLine: React.FC = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    var config = {
        data: data,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        annotations: [
            {
                type: 'regionFilter',
                start: ['min', 'median'],
                end: ['max', '0'],
                color: '#F4664A',
            },
            {
                type: 'text',
                position: ['min', 'median'],
                content: '中位数',
                offsetY: -4,
                style: {textBaseline: 'bottom'},
            },
            {
                type: 'line',
                start: ['min', 'median'],
                end: ['max', 'median'],
                style: {
                    stroke: '#F4664A',
                    lineDash: [2, 2],
                },
            },
        ],
    };
    // @ts-ignore
    return <Line {...config} />;
};

export const DemoPie: React.FC<any> = ({objectives}: any) => {
    const map = {
        1: 0,
        2: 0,
        3: 0,
        0: 0,
        100: 0,
    };
    (objectives || []).forEach((objective) => {
        objective.children.forEach((item) => {
            if (item.progress === 0) {
                map[0] += 1;
                return;
            }
            // if (item.progress === 100) {
            //     map[100] += 1;
            // }
            map[item.status] += 1;
        });
    });

    // var data = [
    //     {
    //         type: '已完成',
    //         value: 1,
    //     },
    //     {
    //         type: '进行中',
    //         value: 2,
    //     },
    //     {
    //         type: '未开始',
    //         value: 1,
    //     },
    //     {
    //         type: '有风险',
    //         value: 3,
    //     },
    //     {
    //         type: '已延期',
    //         value: 2,
    //     },
    // ];
    // color: ['#52c41a', '#1890ff', '#f5f5f5', 'orange', 'red'],
    const data = [
        map[1] > 0 && {
            type: '正常',
            value: map[1],
        },
        map[2] > 0 && {
            type: '有风险',
            value: map[2],
        },
        map[3] > 0 && {
            type: '已延期',
            value: map[3],
        },
        map[100] > 0 && {
            type: '已完成',
            value: map[100],
        },
        map[0] > 0 && {
            type: '未开始',
            value: map[0],
        },
    ].filter(Boolean);
    const config = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        color: [map[1] > 0 && '#1890ff', map[2] > 0 && 'orange', map[3] > 0 && 'red', map[100] > 0 && '#52c41a', map[0] > 0 && '#f5f5f5',].filter(Boolean),
        radius: 1,
        innerRadius: 0.6,
        label: {
            autoHide: true,
            // labelLine: null,
            type: 'inner',
            // offset: '-50%',
            // content: '{value}',
            // style: {
            //     textAlign: 'center',
            //     fontSize: 10,
            // },
        },
        // interactions: [{ type: 'element-selected' }, { type: 'element-active' vcvb }],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                // formatter: function formatter() {
                //     // return 'AntV\nG2Plot';
                // },
            },
        },
    };
    return <Pie {...config} />;
};

