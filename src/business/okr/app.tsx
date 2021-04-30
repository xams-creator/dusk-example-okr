import * as React from 'react';
import {RouterView} from '@xams-framework/dusk';

class OkrApp extends React.Component<any> {

    render() {
        return (
            <RouterView routes={this.props.route.routes}/>
        );
    }

}

export default OkrApp;
