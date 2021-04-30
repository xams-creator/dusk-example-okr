import * as React from 'react';

import {RouteConfig} from '@xams-framework/dusk';

import OkrIndex from '../business/okr';
import OkrAppHome from '../business/okr/pages/home';
import OkrLogin from '../business/okr/components/okr-login';
import OkrAppHomeBasic from '../business/okr/pages/home/components/okr-basic';
import OkrAppHomeTree from '../business/okr/pages/home/components/okr-tree';
import OkrAppHomePeriod from '../business/okr/pages/home/components/okr-period';
import {EmptyResult} from '../business/okr/components/empty-objective';

export default function routes(render): Array<RouteConfig> {
    return [
        {
            path: ['/'],
            render: render,
            routes: [
                {
                    path: ['/okr'],
                    component: OkrIndex,
                    routes: [
                        {
                            path: ['/okr/home'],
                            component: OkrAppHome,
                            routes: [
                                {
                                    path: ['/okr/home/basic'],
                                    component: OkrAppHomeBasic,
                                },
                                {
                                    path: ['/okr/home/tree'],
                                    component: OkrAppHomeTree,
                                },
                                // {
                                //     path: ['/okr/home/period'],
                                //     component: OkrAppHomePeriod,
                                // },
                                {
                                    path: ['/okr/home/*'],
                                    render() {
                                        return <EmptyResult/>;
                                    }
                                },
                            ]
                        },
                        {
                            path: ['/okr/todo'],
                            render() {
                                return <EmptyResult/>;
                            }
                        },
                        {
                            path: ['/okr/app2'],
                            render() {
                                return <EmptyResult/>;
                            }
                        },
                    ]
                },
                {
                    path: ['/user/login'],
                    exact: true,
                    component: OkrLogin,
                },
                // {
                //     path: ['*'],
                //     component: OkrLogin,
                // },
            ]
        },
        // {
        //     path: ['/okr'],
        //     component: OkrIndex,
        //     routes: [
        //         {
        //             path: ['/okr/home', '/okr/*'],
        //             component: OkrApp,
        //         }
        //     ]
        // },
        // {
        //     path: ['*'],
        //     component: OkrLogin,
        // },
    ];
}
