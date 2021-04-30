import * as React from 'react';
import {RouterView} from '@xams-framework/dusk';
import NavigationBar from './components/navigation-bar';

import './index.less';

class OkrIndex extends React.Component<any> {

    render() {
        return (
            <>
                <NavigationBar/>
                <RouterView routes={this.props.route.routes}/>
            </>
        );
    }

}


export default OkrIndex;
