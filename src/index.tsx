import * as React from 'react';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd';
import Dusk, {RouterView} from '@xams-framework/dusk';


import createLoading from './configuration/plugins/dusk-loading';
import createValidator from './configuration/plugins/app-validator';


import './index.less';


const app = new Dusk({
    container: '#root',
    history: {
        mode: 'hash'
    },
    render({route}) {
        return (
            <ConfigProvider
                componentSize="middle"
                locale={zhCN}
                autoInsertSpaceInButton>
                <RouterView routes={route.routes}/>
            </ConfigProvider>
        );
    },

});

app.use(createLoading());
app.use(createValidator());

app.startup();

if (module.hot) {
    module.hot.accept();
}
